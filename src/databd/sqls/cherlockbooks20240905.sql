CREATE DATABASE  IF NOT EXISTS `cherlocksbooks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cherlocksbooks`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: cherlocksbooks
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cicles`
--

DROP TABLE IF EXISTS `cicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cicles` (
  `id_cicle` int(11) NOT NULL AUTO_INCREMENT,
  `codi` int(11) NOT NULL DEFAULT 0,
  `nom` varchar(30) NOT NULL,
  `descripcio` varchar(100) DEFAULT NULL,
  `ensenyament` varchar(100) DEFAULT NULL,
  `importGestIB` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id_cicle`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cicles`
--

LOCK TABLES `cicles` WRITE;
/*!40000 ALTER TABLE `cicles` DISABLE KEYS */;
INSERT INTO `cicles` VALUES (1,341,'IFC11','Títol professional bàsic en Informàtica i comunicacions','Formació Professional de Grau Bàsic',1),(2,1066,'IFC32','Tècnic superior en Desenvolupament d\'aplicacions multiplataforma','Grau Superior',1),(3,1072,'IFC33','Tècnic superior en Desenvolupament d\'aplicacions Web','Grau Superior',1),(4,1160,'Ciberseguretat','Ciberseguretat i entorns de la tecnologia de la informació','Curs d\'especialització',1),(5,7837,'IFC21','Tècnic en Sistemes microinformàtics i xarxes','Grau Mitjà',1),(17,7051,'IFC31','Tècnic superior en Administració de sistemes informàtics en xarxa','Grau Superior',1);
/*!40000 ALTER TABLE `cicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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

--
-- Dumping data for table `classrooms`
--

LOCK TABLES `classrooms` WRITE;
/*!40000 ALTER TABLE `classrooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `classrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departaments`
--

DROP TABLE IF EXISTS `departaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departaments` (
  `id_dept` int(11) NOT NULL AUTO_INCREMENT,
  `codi` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `importGestIB` tinyint(4) DEFAULT 1,
  `emailadmin` varchar(100) DEFAULT NULL,
  `contrasenya` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_dept`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departaments`
--

LOCK TABLES `departaments` WRITE;
/*!40000 ALTER TABLE `departaments` DISABLE KEYS */;
INSERT INTO `departaments` VALUES (1,7314,'Comerç i màrqueting (F.P.)','comercimarqueting@cifpfbmoll.eu',0,'classrooms.comerc@cifpfbmoll.eu','Classrooms202425'),(2,7313,'Formació i orientació laboral','fol@cifpfbmoll.eu',1,'classrooms.fol@cifpfbmoll.eu','Classrooms202425'),(3,7312,'Imatge personal (F.P.)','imatgepersonal@cifpfbmoll.eu',0,'classrooms.imatgeper@cifpfbmoll.eu','Classrooms202425'),(4,7315,'Informàtica i comunicacions (F.P.)','dept.informatica@cifpfbmoll.eu',1,'classrooms.informatica@cifpfbmoll.eu','Classrooms202425'),(5,7310,'Orientació','orientacio@cifpfbmoll.eu',1,'classrooms.orientacio@cifpfbmoll.eu','Classrooms202425'),(6,7311,'Sanitat (F.P.)','sanitat@cifpfbmoll.eu',0,'classrooms.sanitat@cifpfbmoll.eu','Classrooms202425');
/*!40000 ALTER TABLE `departaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grups`
--

DROP TABLE IF EXISTS `grups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grups` (
  `id_grup` int(11) NOT NULL AUTO_INCREMENT,
  `codi` int(11) DEFAULT NULL,
  `curs` varchar(30) NOT NULL,
  `id_cicle` varchar(10) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `id_tutor` varchar(50) NOT NULL,
  `estat` tinyint(4) DEFAULT 1,
  `aula` int(11) DEFAULT 0,
  `importGestIB` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id_grup`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grups`
--

LOCK TABLES `grups` WRITE;
/*!40000 ALTER TABLE `grups` DISABLE KEYS */;
INSERT INTO `grups` VALUES (1,598350,'A','341','IFC11A','EAPQLOSOQ2ODNUNDP34J4O91I6PMKU4D',1,133742,1),(2,598351,'B','341','IFC11B','2E5310CFDF700B12E050D70A59056A4C',1,133718,1),(3,598385,'A','1066','IFC32A','9487DEAF0AC119D1E040D70A59052593',1,133708,1),(4,598386,'B','1066','IFC32B','9425F635D072D472E040D70A590548FB',0,133743,1),(5,600235,'C','1066','IFC32C','9425F635D072D472E040D70A590548FB',0,NULL,1),(6,598381,'A','1072','IFC33A','944BA534FC1FE45FE040D70A59055935',1,133721,1),(7,598382,'B','1072','IFC33B','944BA53600BAE45FE040D70A59055935',0,133751,1),(8,599913,'C','1072','IFC33C','944BA53600BAE45FE040D70A59055935',0,NULL,1),(9,598383,'W','1072','IFC33W','2E5310CFE21F0B12E050D70A59056A4C',1,133709,1),(10,598384,'X','1072','IFC33X','944BA535721EE45FE040D70A59055935',1,133707,1),(11,598326,'A','1160','CiberseguretatA','944BA535A3B4E45FE040D70A59055935',1,133747,1),(12,598371,'A','7051','IFC31A','ATEBPTYCH3I39DVQ87KC53A9C62JJED2',1,133713,1),(13,598372,'B','7051','IFC31B','9425F633E33ED472E040D70A590548FB',0,133723,1),(14,600230,'C','7051','IFC31C','9425F633E33ED472E040D70A590548FB',0,NULL,1),(15,599813,'D','7051','IFC31D','9425F635DA7BD472E040D70A590548FB',0,NULL,1),(16,598373,'W','7051','IFC31W','B91203086F048E84E040D70A5905310A',1,133720,1),(17,598374,'X','7051','IFC31X','0X00J3SL1IRQZQNFNZZ3BF2C3NLR89P0',1,133753,1),(18,598368,'A','7837','IFC21A','KK227M5LQXVIDLMM28DLNN3MO76EO83P',1,133743,1),(19,598369,'B','7837','IFC21B','9425F634D34AD472E040D70A590548FB',1,133747,1),(20,598370,'C','7837','IFC21C','9425F635D0F0D472E040D70A590548FB',0,133751,1),(21,599599,'D','7837','IFC21D','9425F634D34AD472E040D70A590548FB',0,NULL,1),(22,600314,'E','7837','IFC21E','9425F635D0F0D472E040D70A590548FB',0,NULL,1);
/*!40000 ALTER TABLE `grups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materies`
--

DROP TABLE IF EXISTS `materies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materies` (
  `id_mat` int(11) NOT NULL AUTO_INCREMENT,
  `codi` int(11) DEFAULT NULL,
  `id_prof` varchar(50) NOT NULL,
  `id_cicle` int(11) DEFAULT 0,
  `id_grup` int(11) DEFAULT 0,
  `id_aula` int(11) DEFAULT 0,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_mat`)
) ENGINE=InnoDB AUTO_INCREMENT=1450 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materies`
--

LOCK TABLES `materies` WRITE;
/*!40000 ALTER TABLE `materies` DISABLE KEYS */;
/*!40000 ALTER TABLE `materies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professorat`
--

DROP TABLE IF EXISTS `professorat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professorat` (
  `id_prof` int(11) NOT NULL AUTO_INCREMENT,
  `codi` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `llinatges` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `departament` varchar(30) NOT NULL,
  `comentaris` varchar(100) DEFAULT NULL,
  `estat` varchar(45) NOT NULL,
  PRIMARY KEY (`id_prof`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professorat`
--

LOCK TABLES `professorat` WRITE;
/*!40000 ALTER TABLE `professorat` DISABLE KEYS */;
/*!40000 ALTER TABLE `professorat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cherlocksbooks'
--

--
-- Dumping routines for database 'cherlocksbooks'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-05 23:28:19
