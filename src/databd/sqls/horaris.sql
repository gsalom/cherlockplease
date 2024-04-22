
SELECT * FROM cherlock.horaris where id_aula not in (select codi_aula from carretons);

SELECT h.id_aula, a.nom, a.codi horarisFROM cherlock.horaris h, cherlock.aules a where a.codi=h.id_aula;

SELECT c.nom as cicle, a.nom as aula, concat(p.llin2," ",p.llin1,",",p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.cicles c, cherlock.aules a  where h.id_cicle=c.codi and h.id_prof=p.codi and h.id_aula=a.codi;

SELECT * FROM cherlock.horaris where  hora="13:35:00" order by id_aula, hora;

SELECT * FROM cherlock.horaris where email="tribot@cifpfbmoll.eu";

SELECT id_prof,dia, hora FROM cherlock.horaris where id_aula="133753" order by dia, hora;

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
