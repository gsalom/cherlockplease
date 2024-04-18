-- SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris 
-- FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c, cherlock.horaris h where r.email=p.email and r.id_aula=c.codi_aula and p.codi=h.id_prof;

-- professorat que no ha fet cap revisió

select distinct h.email, concat(p.llin2," ",p.llin1,", ",p.nom) as profe from cherlock.horaris h, cherlock.professorat p where not exists (select * from cherlock.revisions r where r.email=h.email) and h.tipus=1 and h.email=p.email;