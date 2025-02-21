SELECT * FROM cherlock.revisions;

-- Despres de fer els inserts s'ha de fer això 

UPDATE professorat cherlock.revisions r INNER JOIN cherlock.aules a on  r.aula=a.nom SET r.id_aula = a.codi;


-- canvis d'un professors a horaris
UPDATE cherlock.horaris h SET h.email="njuaristi@cifpfbmoll.eu" WHERE h.id_prof="9425F635D0F0D472E040D70A590548FB";
UPDATE cherlock.horaris h SET h.id_prof="HR1HIGW07YQ8IK9XZ3UX6XNY559VCONX" WHERE h.email="njuaristi@cifpfbmoll.eu";



UPDATE cherlock.revisions r SET r.id_aula="133747" WHERE r.aula="C401 CIBER";

SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris 
FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula;

select email, dayofweek(data_rev)-1, data_rev, hora_rev from cherlock.revisions where id_aula=133753;
 
select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);

select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);


-- Revisions no fetes entre dues dates

WITH recursive Date_Ranges AS (
select '2024-12-02' as dia
   union all
   select dia + interval 1 day
   from Date_Ranges
   where dia < '2024-12-06')
select 
	d.dia as data_rev,
    p.*
	from 
		Date_Ranges d, 
		(select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a where h.tipus=1 and h.email=p.email and h.id_aula=a.codi
			) p
	where 
		dayofweek(d.dia)-1 = p.dia
        and not exists (select 1 from cherlock.revisions r where r.email=p.email and d.dia=r.data_rev and DAYOFWEEK(r.data_rev)-1=p.dia);
        
  
   
   
    select pnc.*, (select IF(count(*)>0, 1, 0) from revisionsnofetes rnf where rnf.email=pnc.email and pnc.data_rev=date_format(rnf.dia, "%d/%m/%y") and pnc.hora=rnf.hora) as hies from (WITH recursive Date_Ranges AS (select "' + req.query.dataini + '" as dia union all select dia + interval 1 day from Date_Ranges where dia < "' + req.query.datafin + '") select date_format(d.dia, "%d/%m/%y") as data_rev, p.* from Date_Ranges d, (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, g.nom as grup, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a, cherlock.grups g where h.id_grup=g.codi and h.tipus=1 and h.email=p.email and h.id_aula=a.codi) p where dayofweek(d.dia)-1 = p.dia and not exists (select 1 from cherlock.revisions r where r.email=p.email and d.dia=r.data_rev and DAYOFWEEK(r.data_rev)-1=p.dia)) pnc;
