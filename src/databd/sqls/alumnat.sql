CREATE TABLE `alumnat` (
  `id_alum` int(11) NOT NULL,
  `codi` varchar(50) DEFAULT NULL,
  `nom` varchar(100) NOT NULL,
  `llin1` varchar(50) DEFAULT NULL,
  `llin2` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `grup` varchar(11) NOT NULL,
  `comentaris` varchar(100) DEFAULT NULL,
  `credit` int(11) DEFAULT 15
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;