SELECT * FROM cherlock.ordinadors o, cherlock.carretons c, cherlock.alumnat;


INSERT INTO `cherlock`.`ordinadors` (`nom`,`carreto`,`caracteristiques`,`estat`,`assignacio`) VALUES ('ARIEL22',,'i3',10,null);

INSERT INTO `cherlock`.`alumnat` ( `codi`, `nom`, `llin1`, `llin2`, `grup`) VALUES ('944BA53600BAE45FE040D70A59055935', 'RAFA', 'ANDION', 'NULL', '598350');


SELECT c.nom, o.nom, concat(a.llin1," ",a.llin2,", ",a.nom) as assignat, o.estat, o.comentaris FROM cherlock.ordinadors o, cherlock.carretons c, cherlock.alumnat a where o.carreto=c.id_car and c.id_car=2 and o.assignacio=a.codi;

