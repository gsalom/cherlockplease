SELECT * FROM cherlock.ordinadors;

SELECT c.nom as carreto, o.nom, concat(a.llin1,' ',a.llin2,', ',a.nom) as assignat,
 o.estat, o.comentaris 
 FROM cherlock.ordinadors o, cherlock.carretons c, 
	(select a.codi, a.llin1, a.llin2, a.nom FROM cherlock.alumnat a
     UNION ALL
     select p.codi, p.llin1, p.llin2, p.nom FROM cherlock.professorat p) a
 where o.carreto=c.id_car and o.assignacio=a.codi and c.id_car=10;
 

SELECT o.nom, concat(a.llin1,' ',a.llin2,', ',a.nom) as assignat, c.nom as carreto, o.comentaris as estat FROM cherlock.ordinadors o,  cherlock.carretons c, (select a.codi, a.llin1, a.llin2, a.nom FROM cherlock.alumnat a
     UNION ALL
     select p.codi, p.llin1, p.llin2, p.nom FROM cherlock.professorat p) a where o.carreto=c.id_car and o.assignacio=a.codi order by o.nom;