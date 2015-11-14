-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.17 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.5009
-- --------------------------------------------------------

-- Dumping structure for procedure wheresmylunch.AddDish
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddDish`(IN `p_idDish` INT, IN `p_idPayment` INT, IN `p_quantity` INT)
BEGIN
insert into dishesxpayment (dishesxpayment.idDish,dishesxpayment.idPayment,dishesxpayment.quantity) 
values(p_idDish,p_idPayment,p_quantity);
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.CompareRestaurants
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CompareRestaurants`(IN `p_iniDate` DATE, IN `p_finDate` DATE)
BEGIN
SELECT restaurant.name,sum(payment.total)
FROM payment inner join restaurant
ON payment.idRestaurant = restaurant.idRestaurant
WHERE payment.date > p_iniDate and payment.date < p_finDate
GROUP BY payment.idRestaurant;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.CompletePayment
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CompletePayment`(IN `p_idPayment` INT)
BEGIN
set @total := (select sum(dish.price*dishesxpayment.quantity) from dishesxpayment inner join dish on dishesxpayment.idDish = dish.idDish where dishesxpayment.idPayment = p_idPayment);
update payment
set payment.total = @total
where payment.idPayment = p_idPayment;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.ConsultIngredient
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultIngredient`(IN `p_idIngredient` INT, IN `p_idRestaurant` INT, IN `p_IniDate` DATE, IN `p_FinDate` INT)
BEGIN
SELECT person.firstname,person.lastname1,payment.total,payment.`type`,payment.discount,payment.date
FROM person inner join payment on person.idPerson = payment.idPerson
inner join dishesxpayment on payment.idPayment = dishesxpayment.idPayment
inner join dish on dishesxpayment.idDish = dish.idDish
inner join ingredientsxdish on dish.idDish = ingredientsxdish.idDish
inner join ingredientxrestaurant on ingredientsxdish.idIngredient = ingredientxrestaurant.idIngredient
inner join ingredient on ingredientxrestaurant.idIngredient = ingredient.idIngredient
WHERE payment.idRestaurant = IFNULL(p_idRestaurant,payment.idRestaurant)
and ingredient.idIngredient = p_idIngredient
and payment.date > ifnull(p_IniDate, payment.date)
and payment.date < ifnull(p_FinDate, payment.date)
ORDER BY payment.date;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.DeleteIngredient
DELIMITER //
CREATE DEFINER=`root`@`wheresmylunchwheresmylunchlocalhost` PROCEDURE `DeleteIngredient`(IN `p_idIngredient` INT, IN `p_idIRestaurant` INT)
BEGIN
DELETE FROM ingredientxrestaurant
WHERE ingredientxrestaurant.idIngredient = p_idIngredient and ingredientxrestaurant.idRestaurant = p_idRestaurant;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.DeletePerson
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeletePerson`(IN `p_idPerson` INT)
    DETERMINISTIC
BEGIN
delete from person
where person.idPerson = p_idPerson;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.GetIngredient
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetIngredient`(IN `p_ingredientName` VARCHAR(45), IN `p_idRestaurant` INT)
BEGIN
select ingredient.ingredientName as name,ingredient.photo as photo, ingredientxrestaurant.stocks as stocks, ingredientxrestaurant.price as price
from ingredient inner join ingredientxrestaurant on ingredient.idIngredient = ingredientxrestaurant.idIngredient
where ingredient.ingredientName = UPPER(p_ingredientName) and ingredientxrestaurant.idRestaurant = p_idRestaurant;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.GetPerson
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPerson`(IN `p_idPerson` INT, IN `p_mail` VARCHAR(100), IN `p_firstname` VARCHAR(45), IN `p_lastname1` VARCHAR(45), IN `p_lastname2` VARCHAR(45), IN `p_phone` INT)
BEGIN
select person.idPerson as id,person.mail,person.firstname,person.lastname1,person.lastname2,person.phone,person.isAdmin
from person
where person.idPerson = IFNULL(p_idPerson,person.idPerson) and person.mail = IFNULL(p_mail,person.mail) and person.firstname = IFNULL(p_firstname,person.firstname)
and person.lastname1 = IFNULL(p_lastname1,person.lastname1) and person.lastname2 = IFNULL(p_lastname2,person.lastname2) and person.phone = IFNULL(p_phone,person.phone);
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.InsertIngredient
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertIngredient`(IN `p_ingredientName` VARCHAR(45), IN `p_photo` LONGBLOB, IN `p_idRestaurant` POINT, IN `p_stocks` INT, IN `p_price` INT)
BEGIN
DECLARE EXIT HANDLER FOR sqlexception
	BEGIN
		SELECT 'SQLException';
	ROLLBACK;
END;
START TRANSACTION;
SET @num := (SELECT COUNT(ingredient.ingredientName) from ingredient where ingredient.ingredientName = UPPER(p_ingredientName));
	IF @num = 0 THEN
		INSERT INTO ingredient(ingredient.ingredientName,ingredient.photo)
		VALUES (UPPER(p_ingredientName),p_photo);
		set @lastid = LAST_INSERT_ID();
		INSERT INTO ingredientxrestaurant (idIngredient,idRestaurant,stocks,price)
		VALUES (@lastid,p_idRestaurant,p_stocks,p_price);
	ELSE
		SET @ingId := (SELECT ingredient.idIngredient from ingredient where ingredient.ingredientName = p_ingredientName); 
		INSERT INTO ingredientxrestaurant (idIngredient,idRestaurant,stocks,price)
		VALUES (@ingId,p_idRestaurant,p_stocks,p_price);
	END IF;
COMMIT;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.InsertPerson
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPerson`(IN `p_idPerson` INT, IN `p_mail` VARCHAR(100), IN `p_password` VARCHAR(45), IN `p_firstname` VARCHAR(45), IN `p_lastname1` VARCHAR(45), IN `p_lastname2` VARCHAR(45), IN `p_phone` INT, IN `p_isAdmin` INT, IN `p_photo` INT)
    DETERMINISTIC
BEGIN
insert into person(person.idPerson,person.mail,person.password,person.firstname,person.lastname1,person.lastname2,person.phone,person.isAdmin,person.photo)
values(p_idPerson,p_mail,p_password,p_firstname,p_lastname1,p_lastname2,p_phone,p_isAdmin,p_photo);
END//
DELIMITER ;


-- Dumping structure for function wheresmylunch.NewPayment
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `NewPayment`(`p_type` VARCHAR(45), `p_idRestaurant` INT, `p_idPerson` INT) RETURNS int(11)
BEGIN
set @varq := (SELECT SUM(payment.total) from payment where payment.idPerson = p_idPerson and payment.date BETWEEN(CURDATE() - INTERVAL 1 MONTH) AND CURDATE());
IF @varq > 20000 THEN
	set @disc = 35;
ELSE
	set @disc = 0;
END IF;
INSERT INTO payment(payment.`type`,payment.idRestaurant,payment.idPerson,payment.date,payment.discount)
VALUES (p_type,p_idRestaurant,p_idPerson,CURDATE(),@disc);
set @idPay = LAST_INSERT_ID();
return(@idPay);
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.SalesByDate
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SalesByDate`(IN `p_date` DATE, IN `p_idRestaurant` INT)
BEGIN
SELECT payment.date,payment.total,person.firstname,person.lastname1, person.lastname2,restaurant.name
FROM person inner join payment on person.idPerson = payment.idUser inner join restaurant on payment.idRestaurant = restaurant.idRestaurant
WHERE payment.date = p_date and payment.idRestaurant = p_idRestaurant;
END//
DELIMITER ;


-- Dumping structure for procedure wheresmylunch.UpdateIngredient
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateIngredient`(IN `p_idIngredient` INT, IN `p_ingredientName` VARCHAR(45), IN `p_photo` LONGBLOB, IN `p_idRestaurant` INT, IN `p_price` INT, IN `p_stocks` INT)
    DETERMINISTIC
BEGIN
DECLARE EXIT HANDLER FOR sqlexception
	BEGIN
		SELECT 'SQLException';
	ROLLBACK;
END;
START TRANSACTION;
	UPDATE ingredient
	SET ingredient.ingredientName = ifnull(UPPER(p_ingredientName),ingredient.ingredientName),
		ingredient.photo = ifnull(p_photo,ingredient.photo)
	WHERE ingredient.idIngredient = p_idIngredient;
	UPDATE ingredientxrestaurant
	SET ingredientxrestaurant.price = IFNULL(p_price,ingredientxrestaurant.price),
		ingredientxrestaurant.stocks = IFNULL(p_stocks,ingredientxrestaurant.stocks)
	WHERE ingredientxrestaurant.idIngredient = p_idIngredient and ingredientxrestaurant.idRestaurant = p_idRestaurant;
COMMIT;
END//
DELIMITER ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
