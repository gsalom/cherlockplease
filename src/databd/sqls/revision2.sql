SELECT * FROM cherlock.revisions;

UPDATE cherlock.revisions r 
SET 
    r.id_aula = (SELECT 
            a.codi
        FROM
            cherlock.aules a
        WHERE
            a.nom = r.aula
        LIMIT 1)
WHERE
    r.id_aula IS NULL;


INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','18:15:18','apetitverd@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','20:48:49','aribas@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','21:1:37','jbarcelo@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','21:5:56','mrebasabujosa@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','21:15:49','nburguerag@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-17','21:21:12','restarellasmatas@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','8:37:40','cnoguera@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','14:23:57','xordinasribas@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','14:29:14','afonolleres@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','15:33:31','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','15:40:22','mtaberner@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','17:54:10','apetitverd@cifpfbmoll.eu','A107','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','18:7:10','jllado@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','18:22:38','mtaberner@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','18:33:3','mbujosa@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','21:9:52','tserna@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','21:10:30','aacuna@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','21:14:20','ccolloliver@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-18','21:18:16','apetitverd@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','12:37:19','cnoguera@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','14:18:26','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','15:32:40','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','18:16:19','apetitverd@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','18:17:49','restarellasmatas@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:1:20','tserna@cifpfbmoll.eu','C401 CIBER','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:6:38','mtaberner@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:7:35','mrebasabujosa@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:15:22','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:15:59','aacuna@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:21:49','tribot@cifpfbmoll.eu','A206','INCIDÈNCIA DETECTADA','Hi ha un ordenador de més (14) dels que diu el llistat.');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-19','21:23:41','tribot@cifpfbmoll.eu','A206','INCIDÈNCIA DETECTADA','No hi ha el candado del carretó dels portàtils. Tanco el carretó amb el candado dels allargadors.');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','14:43:10','afonolleres@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','19:12:12','mtaberner@cifpfbmoll.eu','A107','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','19:40:11','bseguraduran@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','21:6:18','aacuna@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','21:6:57','mrebasabujosa@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-20','21:7:4','apetitverd@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','9:38:28','cnoguera@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','14:6:0','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','14:13:34','pgonzalezmaya@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','17:28:11','jbarcelo@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','18:58:59','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','21:12:56','jllado@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','21:13:23','aacuna@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-21','21:16:36','mtabernerferrer@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','8:33:53','xordinasribas@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','9:3:53','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','14:13:50','xordinasribas@cifpfbmoll.eu','C401','INCIDÈNCIA DETECTADA','NIX06 es deforma a prop de la bisagra esquerra quan es tanca la pantalla');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','15:57:53','bseguraduran@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','17:15:49','faragoneslopez@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','17:23:57','apascual@cifpfbmoll.eu','C101','OK','ok');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','18:16:29','apetitverd@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','21:3:37','jbarcelo@cifpfbmoll.eu','A200','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','21:15:24','nburguerag@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','21:16:3','aribas@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-24','21:20:41','restarellasmatas@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','8:35:49','cnoguera@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','14:22:2','afonolleres@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','14:26:34','xordinasribas@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','15:28:54','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','17:54:32','apetitverd@cifpfbmoll.eu','A107','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','18:9:47','bseguraduran@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','18:17:58','jllado@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','19:38:41','mrebasabujosa@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','21:12:46','aacuna@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','21:14:10','ccolloliver@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','21:14:15','bseguraduran@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','21:16:36','tserna@cifpfbmoll.eu','A200','INCIDÈNCIA DETECTADA','1 sol PC. Hydra05. Diana sen du el seu a casa? ');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-25','21:19:33','apetitverd@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','14:20:31','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','14:28:50','cnoguera@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','15:32:26','jbarcelo@cifpfbmoll.eu','A200','INCIDÈNCIA DETECTADA','Manca HIPERION22. Escriuré un correu a na Diana, que la darrera vegada sel va endur.');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','18:14:21','apetitverd@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','18:16:39','restarellasmatas@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','18:17:10','restarellasmatas@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','18:17:33','tserna@cifpfbmoll.eu','A107','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','21:1:36','mtaberner@cifpfbmoll.eu','A200','INCIDÈNCIA DETECTADA','Torna a faltar un pc');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','21:6:22','mrebasabujosa@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','21:10:41','tserna@cifpfbmoll.eu','C401 CIBER','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','21:18:7','aacuna@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-26','21:18:42','tribot@cifpfbmoll.eu','C402','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-27','14:10:54','aamengual@cifpfbmoll.eu','C402','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-27','17:44:26','restarellasmatas@cifpfbmoll.eu','C300','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-27','20:48:35','apetitverd@cifpfbmoll.eu','A206','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-27','21:1:31','mrebasabujosa@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-27','21:19:9','aacuna@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','9:29:16','cnoguera@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','14:14:57','pgonzalezmaya@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','14:15:10','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','18:55:47','jbarcelo@cifpfbmoll.eu','A105','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','20:46:55','mruizrivera@cifpfbmoll.eu','A208','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','21:13:31','aacuna@cifpfbmoll.eu','A207','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','21:15:26','jllado@cifpfbmoll.eu','A206','OK','Nuria ha tornat a Intensiva');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','21:20:52','mtabernerferrer@cifpfbmoll.eu','C101','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-28','21:35:1','mtaberner@cifpfbmoll.eu','A200','INCIDÈNCIA DETECTADA','Segueix faltan el portátil ');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-31','8:32:55','cnoguera@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-31','9:14:12','xordinasribas@cifpfbmoll.eu','C201','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-31','14:6:38','aamengual@cifpfbmoll.eu','C402','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-31','14:14:5','xordinasribas@cifpfbmoll.eu','C401','OK','');
INSERT INTO `revisions`(`data_rev`, `hora_rev`, `email`, `aula`, `estat`, `comentaris`) VALUES ('2025-3-31','15:27:31','mruizrivera@cifpfbmoll.eu','A208','OK','');