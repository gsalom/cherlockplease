
SELECT * FROM cherlock.horaris where id_aula not in (select codi_aula from carretons);

SELECT h.id_aula, a.nom, a.codi horarisFROM cherlock.horaris h, cherlock.aules a where a.codi=h.id_aula;

SELECT c.nom as cicle, a.nom as aula, concat(p.llin2," ",p.llin1,",",p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.cicles c, cherlock.aules a  where h.id_cicle=c.codi and h.id_prof=p.codi and h.id_aula=a.codi;

SELECT * FROM cherlock.horaris where  hora="13:35:00" order by id_aula, hora;

SELECT * FROM cherlock.horaris where email="tribot@cifpfbmoll.eu";

SELECT id_grup, id_prof,dia, hora FROM cherlock.horaris where id_aula="133753" order by dia, hora;


update horaris h set h.tipus=1 where in 

UPDATE cherlock.horaris h SET h.tipus = (select 0 where exists (select p.email from cherlock.horaris h cherlock.grups g where h.id_cicle=g.cicle));

-- per actualitzar grups de segon al 3r Trimestre

 UPDATE cherlock.horaris h SET h.tipus = (select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.grups g where h.id_grup=g.codi and g.estat=0))
 where (select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.grups g where h.id_grup=g.codi and g.estat=0)) is not null;

 
select distinct h.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe from cherlock.horaris h, cherlock.professorat p where not exists (select * from cherlock.revisions r where r.email=h.email) and h.tipus=1 and h.email=p.email;
 
select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia from cherlock.professorat p, cherlock.horaris h where h.tipus=1 and h.email=p.email
 and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia);
 
SELECT * FROM cherlock.horaris where dia=3 and email='tgaya@cifpfbmoll.eu';
SELECT * FROM cherlock.horaris where id_grup='598381' and hora='17:20:00';

-- borrar horaris sense aula id_aula=0

SELECT * FROM cherlock.horaris where id_aula=0;
delete from cherlock.horaris where id_aula=0;
 
 -- borrar horaris aules sense carretons
 
SELECT * FROM cherlock.horaris where id_aula not in (select codi_aula from carretons);

delete from cherlock.horaris where id_aula not in (select codi_aula from carretons);

-- Mira quant horaris estan buids d'emails

Select * FROM cherlock.horaris where email is null; 

-- ficar email professorat a horaris
UPDATE cherlock.horaris h INNER JOIN cherlock.profGestib pg on  h.id_prof=pg.id_Gestib SET h.email = pg.email;

-- borrar horaris de grups de no informàtica

SELECT * FROM cherlock.horaris where id_grup not in (select codi from grups);

delete from cherlock.horaris where id_grup not in (select codi from grups);

-- canviar a tipus 0 horaris que no s'han de revisar 

SELECT * FROM cherlock.horaris where hora="14:30:00";

UPDATE cherlock.horaris h  SET h.tipus=0 where hora="14:30:00";

-- professors amb horari



SELECT h.id_prof, count(*) FROM cherlock.horaris h, professorat p where h.id_prof=p.codi and h.tipus=0 and h.id_prof="944BA538102DE45FE040D70A59055935" GROUP BY h.id_prof;

SELECT h.id_prof, count(*) FROM cherlock.horaris h, professorat p where h.id_prof=p.codi and h.tipus=1 GROUP BY h.id_prof;
SELECT h.id_prof, p.llin1, count(*) FROM cherlock.horaris h, professorat p where h.id_prof=p.codi and p.departament="7315" GROUP BY h.id_prof;
SELECT h.id_prof, p.llin1, count(*) FROM cherlock.horaris h, professorat p where h.id_prof=p.codi and h.tipus=1 and p.departament="7315" GROUP BY h.id_prof;



select p.codi, p.departament from  professorat p where p.departament in (7310, 7313, 7314, 7315);

select p.departament, count(p.codi) from  professorat p where p.departament in (7310, 7313, 7314, 7315) GROUP BY p.departament


-- canvis d'un professors a horaris
UPDATE cherlock.horaris h SET h.email="njuaristi@cifpfbmoll.eu" WHERE h.id_prof="9425F635D0F0D472E040D70A590548FB";
UPDATE cherlock.horaris h SET h.id_prof="HR1HIGW07YQ8IK9XZ3UX6XNY559VCONX" WHERE h.email="njuaristi@cifpfbmoll.eu";
