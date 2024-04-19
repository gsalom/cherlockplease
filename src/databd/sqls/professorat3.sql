SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat order by credit;

-- llevar credit a professorat que no fitxa
UPDATE cherlock.professorat SET credit=credit-1 WHERE email="bseguraduran@cifpfbmoll.eu";
SELECT * FROM cherlock.professorat where email="bseguraduran@cifpfbmoll.eu";
