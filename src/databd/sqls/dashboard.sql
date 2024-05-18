SELECT * FROM cherlock.revisionsnofetes;
SELECT SUM(consumo_combustible.importe) as imp, MONTH(consumo_combustible.fecha) as mes FROM consumo_combustible WHERE YEAR(consumo_combustible.fecha)=2018 GROUP BY consumo_combustible.fecha;

SELECT cherlock.revisionsnofetes.professorat, COUNT(cherlock.revisionsnofetes.email) as vegades FROM cherlock.revisionsnofetes WHERE YEAR(cherlock.revisionsnofetes.dia)=2024 GROUP BY cherlock.revisionsnofetes.professorat order by vegades;

SELECT * FROM cherlock.revisions;
SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions WHERE YEAR(cherlock.revisions.data_rev)=2024 GROUP BY cherlock.revisions.estat;


SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions  WHERE (cherlock.revisions.data_rev > '2024-04-14' AND cherlock.revisions.data_rev  < '2024-04-18') GROUP BY cherlock.revisions.estat;

SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions  WHERE cherlock.revisions.data_rev BETWEEN '2024-04-14' AND '2024-04-18' GROUP BY cherlock.revisions.estat;

SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions  WHERE (cherlock.revisions.data_rev > '2024-04-14' AND cherlock.revisions.data_rev  < '2024-04-18') GROUP BY cherlock.revisions.estat
UNION
SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions  WHERE (cherlock.revisions.data_rev > '2024-04-14' AND cherlock.revisions.data_rev  < '2024-04-18')
UNION
SELECT cherlock.horaris.tipus, COUNT(*) FROM cherlock.horaris where tipus=1 GROUP BY cherlock.horaris.tipus;

SELECT * FROM cherlock.carretons;

SELECT cherlock.carretons.estat, COUNT(cherlock.carretons.estat) as total FROM cherlock.carretons