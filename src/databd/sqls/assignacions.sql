SELECT * FROM cherlock.ordinadors o, cherlock.carretons c, cherlock.alumnat;


INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('ARIEL22',8,'adasdasa ',1,'EFC44F17B11FF3E705974311ADB5C48B');



INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`,`comentaris`) VALUES ('ARIEL24',8,'adasdasa ',1,null,'ROBAT');

INSERT INTO `cherlock`.`alumnat` ( `codi`, `nom`, `llin1`, `llin2`, `grup`) VALUES ('944BA53600BAE45FE040D70A59055935', 'RAFA', 'ANDION', 'NULL', '598350');


SELECT c.nom, o.nom, concat(a.llin1," ",a.llin2,", ",a.nom) as assignat, o.estat, o.comentaris FROM cherlock.ordinadors o, cherlock.carretons c, cherlock.alumnat a where o.carreto=c.id_car and c.id_car=2 and o.assignacio=a.codi;


INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`,`comentaris`) VALUES ('ORION14',7,'adasdasa ',1,null,'REPARACIÓ');
INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('IO07',6,'adasdasa ',1,'Antonio Catalan');


INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`,`comentaris`) VALUES ('HIPERION23',10,'adasdasa ',2,null,'RETIRAT');

INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('HIPERION01',2,'adasdasa ',1,'JONATHAN ALEJANDRO ALVARRACIN');

INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('OBERON01',11,'adasdasa ',1,'AARON AGÜERA CAÑADAS');
INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('OBERON06',11,'adasdasa ',1,'ÁNGEL GUIJARRO RICO');
