-- select nom, llin1, email from cherlock.professorat where codi in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);

-- select email, dayofweek(data_rev)-1, data_rev, hora_rev from cherlock.revisions where id_aula=133753;

 -- SELECT id_prof,dia, hora FROM cherlock.horaris where id_aula="133753" order by dia, hora
 
 --select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, h--ora);
 
 --SELECT distinct p.email, h.dia FROM cherlock.professorat p, cherlock.horaris h where p.codi=h.id_prof and h.id_aula="133753";-

--select email from cherlock.revisions where email in (SELECT id_prof FROM cherlock.horaris where id_aula="133753" order by dia, hora);
