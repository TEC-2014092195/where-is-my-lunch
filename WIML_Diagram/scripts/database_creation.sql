-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema wheresmylunch
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wheresmylunch
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wheresmylunch` DEFAULT CHARACTER SET utf8 ;
USE `wheresmylunch` ;

-- -----------------------------------------------------
-- Table `wheresmylunch`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`city` (
  `idCity` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `geom` GEOMETRY NOT NULL COMMENT '',
  PRIMARY KEY (`idCity`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`avenue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`avenue` (
  `idAvenue` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `idCity` INT(11) NOT NULL COMMENT '',
  `geom` GEOMETRY NOT NULL COMMENT '',
  PRIMARY KEY (`idAvenue`)  COMMENT '',
  INDEX `avenue_city_idx` (`idCity` ASC)  COMMENT '',
  CONSTRAINT `avenue_city`
    FOREIGN KEY (`idCity`)
    REFERENCES `wheresmylunch`.`city` (`idCity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`street`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`street` (
  `idStreet` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `idCity` INT(11) NOT NULL COMMENT '',
  `geom` GEOMETRY NOT NULL COMMENT '',
  PRIMARY KEY (`idStreet`)  COMMENT '',
  INDEX `street_city_idx` (`idCity` ASC)  COMMENT '',
  CONSTRAINT `street_city`
    FOREIGN KEY (`idCity`)
    REFERENCES `wheresmylunch`.`city` (`idCity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`block`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`block` (
  `idBlock` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `geom` GEOMETRY NOT NULL COMMENT '',
  `idStreet` INT NOT NULL COMMENT '',
  `idAvenue` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idBlock`)  COMMENT '',
  INDEX `block_avenue_idx` (`idAvenue` ASC)  COMMENT '',
  INDEX `block_street_idx` (`idStreet` ASC)  COMMENT '',
  CONSTRAINT `block_avenue`
    FOREIGN KEY (`idAvenue`)
    REFERENCES `wheresmylunch`.`avenue` (`idAvenue`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `block_street`
    FOREIGN KEY (`idStreet`)
    REFERENCES `wheresmylunch`.`street` (`idStreet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`category` (
  `idCategory` INT NOT NULL COMMENT '',
  `categoryName` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`idCategory`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`restaurant` (
  `idRestaurant` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `schedule` VARCHAR(45) NOT NULL COMMENT '',
  `category` INT NOT NULL COMMENT '',
  `block_idBlock` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`idRestaurant`)  COMMENT '',
  INDEX `fk_restaurant_block1_idx` (`block_idBlock` ASC)  COMMENT '',
  INDEX `restaurant_category_idx` (`category` ASC)  COMMENT '',
  CONSTRAINT `fk_restaurant_block1`
    FOREIGN KEY (`block_idBlock`)
    REFERENCES `wheresmylunch`.`block` (`idBlock`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `restaurant_category`
    FOREIGN KEY (`category`)
    REFERENCES `wheresmylunch`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`person` (
  `idPerson` INT NOT NULL COMMENT '',
  `mail` VARCHAR(100) NOT NULL COMMENT '',
  `password` VARCHAR(45) NOT NULL COMMENT '',
  `firstname` VARCHAR(45) NOT NULL COMMENT '',
  `lastname1` VARCHAR(45) NOT NULL COMMENT '',
  `lastname2` VARCHAR(45) NOT NULL COMMENT '',
  `phone` INT NOT NULL COMMENT '',
  `isAdmin` BIT(1) NULL COMMENT '',
  PRIMARY KEY (`idPerson`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`payment` (
  `idPayment` INT(11) NOT NULL COMMENT '',
  `type` VARCHAR(45) NOT NULL COMMENT '',
  `idRestaurant` INT(11) NOT NULL COMMENT '',
  `idUser` INT NOT NULL COMMENT '',
  `discount` INT NOT NULL COMMENT '',
  `total` INT NOT NULL COMMENT '',
  `idPerson` INT NOT NULL COMMENT '',
  `date` DATE NOT NULL COMMENT '',
  PRIMARY KEY (`idPayment`)  COMMENT '',
  INDEX `fk_payment_restaurant1_idx` (`idRestaurant` ASC)  COMMENT '',
  INDEX `payment_person_idx` (`idPerson` ASC)  COMMENT '',
  CONSTRAINT `payment_restaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `wheresmylunch`.`restaurant` (`idRestaurant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `payment_person`
    FOREIGN KEY (`idPerson`)
    REFERENCES `wheresmylunch`.`person` (`idPerson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`dish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`dish` (
  `idDish` INT NOT NULL COMMENT '',
  `dishName` VARCHAR(45) NULL COMMENT '',
  `category` INT NOT NULL COMMENT '',
  `price` INT NULL COMMENT '',
  PRIMARY KEY (`idDish`)  COMMENT '',
  INDEX `dish_category_idx` (`category` ASC)  COMMENT '',
  CONSTRAINT `dish_category`
    FOREIGN KEY (`category`)
    REFERENCES `wheresmylunch`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`menu` (
  `idRestaurant` INT NOT NULL COMMENT '',
  `idDish` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idRestaurant`, `idDish`)  COMMENT '',
  INDEX `menu_dish_idx` (`idDish` ASC)  COMMENT '',
  CONSTRAINT `menu_restaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `wheresmylunch`.`restaurant` (`idRestaurant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `menu_dish`
    FOREIGN KEY (`idDish`)
    REFERENCES `wheresmylunch`.`dish` (`idDish`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`ingredient` (
  `idIngredient` INT NOT NULL COMMENT '',
  `ingredientName` VARCHAR(45) NOT NULL COMMENT '',
  `category` INT NOT NULL COMMENT '',
  `photo` LONGBLOB NOT NULL COMMENT '',
  PRIMARY KEY (`idIngredient`)  COMMENT '',
  INDEX `ingredient_category_idx` (`category` ASC)  COMMENT '',
  CONSTRAINT `ingredient_category`
    FOREIGN KEY (`category`)
    REFERENCES `wheresmylunch`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`ingredientsxdish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`ingredientsxdish` (
  `idIngredient` INT NOT NULL COMMENT '',
  `idDish` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idIngredient`, `idDish`)  COMMENT '',
  INDEX `nxn_dish_idx` (`idDish` ASC)  COMMENT '',
  CONSTRAINT `nxn_dish`
    FOREIGN KEY (`idDish`)
    REFERENCES `wheresmylunch`.`dish` (`idDish`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `nxn_ingredient`
    FOREIGN KEY (`idIngredient`)
    REFERENCES `wheresmylunch`.`ingredient` (`idIngredient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`ingredientxrestaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`ingredientxrestaurant` (
  `idIngredient` INT NOT NULL COMMENT '',
  `idRestaurant` INT NOT NULL COMMENT '',
  `stocks` INT NOT NULL COMMENT '',
  `price` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idIngredient`, `idRestaurant`)  COMMENT '',
  INDEX `fk_idRestaurant_idx` (`idRestaurant` ASC)  COMMENT '',
  CONSTRAINT `fk_idIngredient`
    FOREIGN KEY (`idIngredient`)
    REFERENCES `wheresmylunch`.`ingredient` (`idIngredient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `wheresmylunch`.`restaurant` (`idRestaurant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wheresmylunch`.`dishesxpayment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wheresmylunch`.`dishesxpayment` (
  `idDish` INT NOT NULL COMMENT '',
  `idPayment` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idDish`, `idPayment`)  COMMENT '',
  INDEX `nxn_payment_idx` (`idPayment` ASC)  COMMENT '',
  CONSTRAINT `nxn_dish_fk`
    FOREIGN KEY (`idDish`)
    REFERENCES `wheresmylunch`.`dish` (`idDish`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `nxn_payment_fk`
    FOREIGN KEY (`idPayment`)
    REFERENCES `wheresmylunch`.`payment` (`idPayment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
