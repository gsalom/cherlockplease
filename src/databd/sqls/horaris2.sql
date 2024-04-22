
SELECT * FROM cherlock.horaris where id_grup='598381' and hora='17:20:00';
SELECT ROW_NUMBER() OVER( ORDER BY id_aula ASC ) as num , id_grup, id_aula, count(*) FROM cherlock.horaris group by id_grup, id_aula order by num;

