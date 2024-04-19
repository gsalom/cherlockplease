
SELECT nom, descripcio, concat(descripcio, nom) FROM cherlock.grups;

UPDATE cherlock.grups SET descripcio = concat(descripcio, nom);

SELECT * FROM cherlock.grups where estat =0;


select 0 where exists (select g.codi, g.descripcio, h.id_grup from cherlock.horaris h, cherlock.grups g where h.id_grup=g.codi and g.estat=0);

select g.codi, g.descripcio, h.id_grup, g.estat from cherlock.grups g where h.id_grup=g.codi  and g.estat=0;

