revisionsinsert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('jvallespirferragut@cifpfbmoll.eu','A000',STR_TO_DATE('26/04/2024','%d/%m/%Y'),'20:35:00','IFC11B','VALLESPIR FERRAGUT, JUAN');
insert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('restarellasmatas@cifpfbmoll.eu','C300',STR_TO_DATE('26/04/2024','%d/%m/%Y'),'17:20:00','IFC31X','ESTARELLAS MATAS, RAFAEL');

-- modificar el credit

UPDATE cherlock.professorat SET credit=credit-1 WHERE email="mtabernerferrer@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat where email="restarellasmatas@cifpfbmoll.eu";


SELECT count(*) as hies  FROM cherlock.revisionsnofetes where email='jramonat@cifpfbmoll.eu' and aula='A208' and grup='IFC32A' and hora='20:35:00' and dia='2024-05-22';

-- recompte de revisions no fetes

SELECT email, count(*) as descompte  FROM cherlock.revisionsnofetes GROUP BY email;