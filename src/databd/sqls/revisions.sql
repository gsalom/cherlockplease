-- SELECT * FROM cherlock.revisions;
-- UPDATE cherlock.revisions r SET r.id_aula = a.codi FROM cherlock.aules a WHERE r.aula=a.nom;

-- UPDATE cherlock.revisions r INNER JOIN cherlock.aules a on  r.aula=a.nom SET r.id_aula = a.codi;

UPDATE cherlock.revisions r SET r.id_aula="133747" WHERE r.aula="C401 CIBER"
