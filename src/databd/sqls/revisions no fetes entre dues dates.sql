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