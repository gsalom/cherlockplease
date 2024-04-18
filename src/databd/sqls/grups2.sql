-- SELECT * FROM cherlock.grups where estat =0;
-- update horaris h set h.tipus=1 where in 

-- UPDATE cherlock.horaris h SET h.tipus = (select 0 where exists (select p.email from cherlock.horaris h cherlock.grups g where h.id_cicle=g.cicle));


select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.horaris h, cherlock.grups g where h.id_grup=g.codi and g.estat=0);

select g.codi, g.descripcio, h.id_grup, g.estat from cherlock.grups g where h.id_grup=g.codi  and g.estat=0;
-- per actualitzar grups de segon al 3r Trimestre

 UPDATE cherlock.horaris h SET h.tipus = (select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.grups g where h.id_grup=g.codi and g.estat=0))
 where (select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.grups g where h.id_grup=g.codi and g.estat=0)) is not null;
 
 select distinct h.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe from cherlock.horaris h, cherlock.professorat p where not exists (select * from cherlock.revisions r where r.email=h.email) and h.tipus=1 and h.email=p.email;
 
 
 
 
 select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia from cherlock.professorat p, cherlock.horaris h where h.tipus=1 and h.email=p.email
 and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia);
