
SELECT * FROM cherlock.professorat where departament<>"7315"and departament<>"7313" and departament<>"7310";

SELECT * FROM cherlock.professorat where departament="7310";

SELECT * FROM cherlock.professorat;

UPDATE cherlock.horaris h SET h.email = (select p.email from cherlock.professorat p where h.id_prof=p.codi);

SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris 
FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c, cherlock.horaris h where r.email=p.email and r.id_aula=c.codi_aula and p.codi=h.id_prof;

-- professorat que no ha fet cap revisió

select distinct h.email, concat(p.llin2," ",p.llin1,", ",p.nom) as profe from cherlock.horaris h, cherlock.professorat p where not exists (select * from cherlock.revisions r where r.email=h.email) and h.tipus=1 and h.email=p.email;

SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat order by credit;

-- llevar credit a professorat que no fitxa

UPDATE cherlock.professorat SET credit=credit-1 WHERE email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";

SELECT distinct p.email, h.dia FROM cherlock.professorat p, cherlock.horaris h where p.codi=h.id_prof and h.id_aula="133753";

select nom, llin1, email from cherlock.professorat where codi in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);