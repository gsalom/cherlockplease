

USE `cherlocksbooks`;
CREATE TABLE `classrooms` (
  `id_classroom` int(11) NOT NULL AUTO_INCREMENT,
  `codi` varchar(50) DEFAULT NULL,
  `nom` varchar(100) NOT NULL,
  `descripcio` varchar(100) DEFAULT NULL,
  `administrador` varchar(100) DEFAULT NULL,
  `professorat1` varchar(50) DEFAULT NULL,
  `professorat2` varchar(50) DEFAULT NULL,
  `email1` varchar(100) DEFAULT NULL,
  `email2` varchar(100) DEFAULT NULL,
  `grup` varchar(11) NOT NULL,
  `comentaris` varchar(100) DEFAULT NULL,
  `departament` int(11) DEFAULT 0,
  PRIMARY KEY (`id_classroom`)
) ENGINE=InnoDB AUTO_INCREMENT=1300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
