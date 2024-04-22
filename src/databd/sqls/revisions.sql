SELECT * FROM cherlock.revisions;

UPDATE cherlock.revisions r SET r.id_aula = a.codi FROM cherlock.aules a WHERE r.aula=a.nom;

UPDATE cherlock.revisions r INNER JOIN cherlock.aules a on  r.aula=a.nom SET r.id_aula = a.codi;

UPDATE cherlock.revisions r SET r.id_aula="133747" WHERE r.aula="C401 CIBER";

SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris 
FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula

select email, dayofweek(data_rev)-1, data_rev, hora_rev from cherlock.revisions where id_aula=133753;
 
select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);

select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);


-- Revisions no fetes entre dues dates

WITH recursive Date_Ranges AS (
select '2024-04-08' as dia
   union all
   select dia + interval 1 day
   from Date_Ranges
   where dia < '2024-04-18')
select 
	d.dia as data_rev,
    p.*
	from 
		Date_Ranges d, 
		(select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a where h.tipus=1 and h.email=p.email and h.id_aula=a.codi
			and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia)) p
	where 
		dayofweek(d.dia)-1 = p.dia;