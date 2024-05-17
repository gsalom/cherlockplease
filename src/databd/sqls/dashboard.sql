SELECT * FROM cherlock.revisionsnofetes;
SELECT SUM(consumo_combustible.importe) as imp, MONTH(consumo_combustible.fecha) as mes FROM consumo_combustible WHERE YEAR(consumo_combustible.fecha)=2018 GROUP BY consumo_combustible.fecha;

SELECT cherlock.revisionsnofetes.professorat, COUNT(cherlock.revisionsnofetes.email) as vegades FROM cherlock.revisionsnofetes WHERE YEAR(cherlock.revisionsnofetes.dia)=2024 GROUP BY cherlock.revisionsnofetes.professorat order by vegades;

SELECT * FROM cherlock.revisions;
SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions WHERE YEAR(cherlock.revisions.data_rev)=2024 GROUP BY cherlock.revisions.estat;
SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions GROUP BY cherlock.revisions.estat;

SELECT COUNT(*) FROM cherlock.horaris where tipus=1;