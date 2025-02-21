
SELECT * FROM cherlock.professorat where departament<>"7315"and departament<>"7313" and departament<>"7310";

SELECT * FROM cherlock.professorat where departament="7310";

SELECT * FROM cherlock.professorat;

UPDATE cherlock.horaris h SET h.email = (select p.email from cherlock.professorat p where h.id_prof=p.codi);

SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris 
FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c, cherlock.horaris h where r.email=p.email and r.id_aula=c.codi_aula and p.codi=h.id_prof;

-- ficar credit 15 a tot el professorat 

UPDATE cherlock.professorat SET credit=15 where credit<15;

-- professorat que no ha fet cap revisió

select distinct h.email, concat(p.llin2," ",p.llin1,", ",p.nom) as profe from cherlock.horaris h, cherlock.professorat p where not exists (select * from cherlock.revisions r where r.email=h.email) and h.tipus=1 and h.email=p.email;

SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat order by credit;

-- llevar credit a professorat que no fitxa

UPDATE cherlock.professorat SET credit=credit-1 WHERE email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";

SELECT distinct p.email, h.dia FROM cherlock.professorat p, cherlock.horaris h where p.codi=h.id_prof and h.id_aula="133753";

select nom, llin1, email from cherlock.professorat where codi in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);

-- professorat nou vs antic

select * FROM cherlock.professorat as p1, cherlock.professorat2 as p2 where p1.codi=p2.codi and p1.departament<>p2.departament;

UPDATE cherlock.professorat2 set email=(select p1.email FROM cherlock.professorat as p1 where p1.codi=codi);

-- create tabla professorat 

CREATE TABLE `professoratNou` (
  `id_prof` int(11) NOT NULL AUTO_INCREMENT,
  `codi` varchar(50) DEFAULT NULL,
  `nom` varchar(100) NOT NULL,
  `llin1` varchar(50) DEFAULT NULL,
  `llin2` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `departament` varchar(30) NOT NULL,
  `comentaris` varchar(100) DEFAULT NULL,
  `credit` int(11) DEFAULT 15,
  PRIMARY KEY (`id_prof`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- insertar nous profes

INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('944BA5342930E45FE040D70A59055935','ARNAU','RIBAS','SERRA','7310');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('VZQLY0305VEJ9NHTJ5PM520EC834XS9C','MIGUEL','TABERNER','FERRER','7310');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('IHGJ1VH5VB76QY6D0LD7H4W68C5S2APA','XAVIER','ORDINAS','RIBAS','7314');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('927DC694448A8518E040D70A590578B9','JOSÉ MIGUEL','ROSSELLÓ','ESTEVE','7310');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('W3Y9MYIC5WQ5TQZC62HRQ6OVSJXX6ARD','FRANCISCO JAVIER','ARAGONÉS','LÓPEZ','7313');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('9425F6352AE2D472E040D70A590548FB','JUAN','LLADO','MARTORELL','7315');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('3NRUXCV3JWTQAE3J77GPCOXENHOZGXPG','ADRIAN','PETIT','VERD','7315');
INSERT INTO `professorat`(`codi`, `nom`, `llin1`,`llin2`,`departament`) VALUES ('944BA533D29CE45FE040D70A59055935','CATALINA','RAMIS','CRESPI','7313');


