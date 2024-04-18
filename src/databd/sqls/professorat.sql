-- SELECT * FROM cherlock.professorat where departament<>"7315"and departament<>"7313" and departament<>"7310";
-- SELECT * FROM cherlock.professorat where departament="7310";
-- horarisSELECT * FROM cherlock.professorat;

UPDATE cherlock.horaris h SET h.email = (select p.email from cherlock.professorat p where h.id_prof=p.codi);
