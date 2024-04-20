 WITH recursive Date_Ranges AS 
 (select '2024-04-01' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2024-04-12')
 select d.dia as data_rev, p.* from Date_Ranges d, (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a where h.tipus=1 and h.email=p.email and h.id_aula=a.codi and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia)) p where dayofweek(d.dia)-1 = p.dia;

-- sql desplegada

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
        
        
-- bona separada revisions amb incidencies
        
WITH recursive Date_Ranges AS
(select '2024-03-19' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2024-03-20')
select 
    d.dia, 
    ko.* 
 from 
    Date_Ranges d,
    (select r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto from cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.estat<>"OK" and r.email=p.email and r.id_aula=c.codi_aula) ko
 where
    d.dia=ko.data_rev;
    
-- bona junta

WITH recursive Date_Ranges AS (select '2024-03-19' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2024-03-20') select d.dia, ko.* from Date_Ranges d, (select r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto from cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.estat<>"OK" and r.email=p.email and r.id_aula=c.codi_aula) ko where d.dia=ko.data_rev;

-- bona separada totes les revisions

WITH recursive Date_Ranges AS
(select '2024-03-19' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2024-04-20')
select 
    d.dia, 
    rev.* 
 from 
    Date_Ranges d,
(SELECT r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula) rev
where
    d.dia=rev.data_rev;
    
-- junta

WITH recursive Date_Ranges AS (select '2024-03-19' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2024-04-20') select d.dia, rev.* from Date_Ranges d, (SELECT r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula) rev where d.dia=rev.data_rev;