-- veure professorat sense emails 

SELECT pg.email FROM cherlock.profGestib as pg, professorat as p where pg.id_Gestib=p.codi and p.email is null;

SELECT departament, count(*) FROM cherlock.professorat where email is null;

-- actualitzar emails

UPDATE cherlock.professorat p INNER JOIN cherlock.profGestib pg on  p.codi=pg.id_Gestib SET p.email = pg.email;