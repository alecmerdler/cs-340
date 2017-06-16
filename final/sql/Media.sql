-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 15, 2017 at 11:45 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_merdlera`
--

-- --------------------------------------------------------

--
-- Table structure for table `Media`
--

CREATE TABLE `Media` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `releaseYear` int(4) NOT NULL,
  `description` varchar(500) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Media`
--

INSERT INTO `Media` (`id`, `type`, `releaseYear`, `description`, `rating`, `title`) VALUES
(1, 'movie', 1994, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'R', 'The Shawshank Redemption'),
(2, 'movie', 1972, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'R', 'The Godfather'),
(3, 'movie', 1974, 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on the family crime syndicate.', 'R', 'The Godfather: Part II'),
(4, 'movie', 2008, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the Dark Knight must come to terms with one of the greatest psychological tests of his ability to fight injustice.', 'PG-13', 'The Dark Knight'),
(5, 'movie', 1957, 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', 'Approved', '12 Angry Men'),
(6, 'series', 2017, 'A recently released ex-convict named Shadow meets a mysterious man who calls himself \"Wednesday\" and who knows more than he first seems to about Shadow\'s life and past.', 'TV-MA', 'American Gods'),
(7, 'series', 2017, 'Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.', 'TV-MA', '13 Reasons Why'),
(8, 'series', 2017, 'Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.', 'TV-MA', 'The Handmaid\'s Tale'),
(9, 'series', 2011, 'Nine noble families fight for control over the mythical lands of Westeros; A forgotten race returns after being dormant for thousands of years.', 'TV-MA', 'Game of Thrones'),
(10, 'series', 2014, 'After being struck by lightning, Barry Allen wakes up from his coma to discover he\'s been given the power of super speed, becoming the Flash, fighting crime in Central City.', 'TV-PG', 'The Flash');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Media`
--
ALTER TABLE `Media`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Media`
--
ALTER TABLE `Media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
