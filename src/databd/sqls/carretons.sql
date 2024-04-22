SELECT * FROM cherlock.carretons;

UPDATE cherlock.carretons SET aula = ;

update  cherlock.carretons
inner join  cherlock.aules
on carretons.codi_aula=aules.codi
set carretons.aula=aules.nom;
