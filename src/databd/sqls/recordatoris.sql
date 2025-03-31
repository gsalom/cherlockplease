SELECT * FROM cherlock.revisions;

select pnc.*, (select IF(count(*)>0, 1, 0) from revisionsnofetes rnf where rnf.email=pnc.email and pnc.data_rev=date_format(rnf.dia, "%d/%m/%y") and pnc.hora=rnf.hora) as hies from
       WITH recursive Date_Ranges AS 
                      (select '2025-02-10' as dia union all select dia + interval 1 day from 
                              Date_Ranges where dia < '2025-02-11') 
select date_format(d.dia, "%d/%m/%y") as data_rev, p.* from Date_Ranges d, 
   (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, g.nom as grup, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a, cherlock.grups g where h.id_grup=g.codi and h.tipus=1 and h.email=p.email and h.id_aula=a.codi) p where dayofweek(d.dia)-1 = p.dia and not exists (select 1 from cherlock.revisions r where r.email=p.email and d.dia=r.data_rev and DAYOFWEEK(r.data_rev)-1=p.dia)) pnc;
 
 WITH recursive Date_Ranges AS  
(select '2025-02-10' as dia union all select dia + interval 1 day from Date_Ranges where dia < '2025-02-10') 
select date_format(d.dia, "%d/%m/%y") as data_rev, p.* from Date_Ranges d, 
  (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, g.nom as grup, a.nom, p.credit from cherlock.professorat p, cherlock.horaris h, cherlock.aules a, cherlock.grups g where h.id_grup=g.codi and h.tipus=1 and h.email=p.email and h.id_aula=a.codi) p where dayofweek(d.dia)-1 = p.dia;
  
  
  
  CREATE TABLE recordatoris LIKE revisionsnofetes; 