-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 29 mars 2019 à 09:53
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `minichat`
--

-- --------------------------------------------------------

--
-- Structure de la table `minichat`
--

DROP TABLE IF EXISTS `minichat`;
CREATE TABLE IF NOT EXISTS `minichat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) CHARACTER SET utf8 NOT NULL,
  `message` varchar(255) CHARACTER SET utf8 NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `minichat`
--

INSERT INTO `minichat` (`id`, `pseudo`, `message`, `date_creation`) VALUES
(1, 'Tom', 'Il fait beau aujourd\'hui, vous ne trouvez pas ?', '2019-03-28 09:00:38'),
(2, 'John', 'Ouais, ça faisait un moment qu\'on n\'avait pas vu la lumière du soleil !', '2019-03-28 10:00:38'),
(3, 'Patrice', 'Ça vous tente d\'aller à la plage aujourd\'hui ? Y\'a de super vagues !', '2019-03-28 11:00:38'),
(4, 'Tom', 'Cool, bonne idée ! J\'amène ma planche !', '2019-03-28 12:00:38'),
(5, 'John', 'Comptez sur moi !', '2019-03-28 13:00:38'),
(6, 'Chris', 'N’ayant toujours pas de planche, je me lance à la recherche du St Graal. J’en ai marre de dépendre des loueurs ou écoles. Je n\'en serai pas donc...', '2019-03-28 15:00:38'),
(7, 'John', 'Une planche en mousse pour les petites conditions (Palavas, les Saintes Maries de la Mer, etc…) puisque tu résides dans le coin, ce sera suffisant...', '2019-03-28 15:30:38'),
(8, 'Patrice', 'Pourquoi pas passer à Decathlon ?', '2019-03-28 15:50:38'),
(9, 'Chris', 'Parce que contrairement à ce que disent certains, les mousses Decatlon sont pas au niveau de celles de l\'école...', '2019-03-28 16:00:38'),
(10, 'Patrice', 'On parle de toute façon d’un produit à la durée de vie limitée. Perso j\'investirais davantage dans une planche “en dur”.', '2019-03-28 16:10:38'),
(11, 'julie', 'Moi j\'ai PHP, je peux pas venir ! Puis le surf, c\'est comme PHP, j\'ai pas le niveau pour vous suivre... Vous me raconterez...', '2019-03-28 17:00:46');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
