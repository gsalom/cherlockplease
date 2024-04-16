-- SELECT nom, descripcio, concat(descripcio, nom) FROM cherlock.grups;
UPDATE cherlock.grups SET descripcio = concat(descripcio, nom);