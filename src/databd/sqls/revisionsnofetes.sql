insert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('jvallespirferragut@cifpfbmoll.eu','A000',STR_TO_DATE('26/04/2024','%d/%m/%Y'),'20:35:00','IFC11B','VALLESPIR FERRAGUT, JUAN');
insert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('restarellasmatas@cifpfbmoll.eu','C300',STR_TO_DATE('26/04/2024','%d/%m/%Y'),'17:20:00','IFC31X','ESTARELLAS MATAS, RAFAEL');


UPDATE cherlock.professorat SET credit=credit-1 WHERE email="restarellasmatas@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat where email="restarellasmatas@cifpfbmoll.eu";