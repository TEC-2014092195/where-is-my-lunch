-- insert into city (idCity,name,geom)
-- VALUES(1,'WHERE\'S MY LUNCH',GeomFromText('POLYGON((0 0,0 500,500 500,500 0,0 0))'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (0,'Avenida0',1,GeomFromText('LINESTRING(0 0,500 0)'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (1,'Avenida1',1,GeomFromText('LINESTRING(0 100,500 100)'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (2,'Avenida2',1,GeomFromText('LINESTRING(0 200,500 200)'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (3,'Avenida3',1,GeomFromText('LINESTRING(0 300,500 300)'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (4,'Avenida4',1,GeomFromText('LINESTRING(0 400,500 400)'));

-- insert into avenue (idAvenue,name,idCity,geom)
-- values (5,'Avenida5',1,GeomFromText('LINESTRING(0 500,500 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (0,'Calle0',1,GeomFromText('LINESTRING(0 0,0 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (1,'Calle1',1,GeomFromText('LINESTRING(100 0,100 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (2,'Calle2',1,GeomFromText('LINESTRING(200 0,200 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (3,'Calle3',1,GeomFromText('LINESTRING(300 0,300 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (4,'Calle4',1,GeomFromText('LINESTRING(400 0,400 500)'));

-- insert into street(idStreet,name,idCity,geom)
-- values (5,'Calle5',1,GeomFromText('LINESTRING(500 0,500 500)'));

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(1,'R1',GeomFromText('POLYGON((0 400,0 500,100 500,100 400,0 400))'),0,4);

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(2,'R2',GeomFromText('POLYGON((400 400,400 500,500 500,500 400,400 400))'),4,4);

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(3,'R3',GeomFromText('POLYGON((200 300,200 400,300 400,300 300,200 300))'),2,3);

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(4,'R4',GeomFromText('POLYGON((400 200,400 300,500 300,500 200,400 200))'),4,2);

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(5,'R5',GeomFromText('POLYGON((100 100,100 200,200 200,200 100,100 100))'),1,1);

-- insert into block (idBlock,name,geom,idStreet,idAvenue)
-- VALUES(6,'R6',GeomFromText('POLYGON((300 0,300 100,400 100,400 0,300 0))'),3,0);

