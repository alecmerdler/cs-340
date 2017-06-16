-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 15, 2017 at 11:46 PM
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
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `numStars` int(1) NOT NULL,
  `mediaID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Reviews`
--

INSERT INTO `Reviews` (`id`, `description`, `numStars`, `mediaID`, `userID`) VALUES
(4, 'This and the Fight Club and two of the most overrated movies I have ever seen. Sure this is nice- got lots of nice talk, nice interracial bonding in a prison, lots of sub stories about a crappy Warden etc. Sure its got a plan to get out, plan that ultimately fruitions but come on- people talk like this is Jesus\'s Second Coming or whatever. ', 1, 1, 25),
(6, 'The Shawshank Redemption and To Kill a Mockingbird are the best movies I have ever seen. I do not judge it by it\'s technical merits - I don\'t really care about that. I have read that Citizen Kane or The Godfather or this or that movie is the best movie ever made. They may have the best technique or be the most influential motion pictures ever made, but not the best. The best movies are ones that touch the soul. It takes a movie like The Shawshank Redemption to touch the soul.', 5, 1, 27),
(7, 'Set aside a little over two hours tonight and rent this movie. You will finally understand what everyone is talking about and you will understand why this is my all time favorite movie.', 5, 1, 24),
(10, 'This show keeps you on the edge of your seat the whole time! The characters are well developed, and feel real. The best part of this show is watching it with a group of friends and cheering for your character to survive the episode!', 5, 9, 28),
(11, 'Crazy good movie. Heath Ledger is an incredible actor! Wish it was longer.', 4, 4, 41),
(12, 'Very boring!', 1, 8, 41);

--
-- Triggers `Reviews`
--
DELIMITER $$
CREATE TRIGGER `addViewFromReview` AFTER INSERT ON `Reviews` FOR EACH ROW INSERT INTO Views (userID, mediaID) VALUES (NEW.userID, NEW.mediaID)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mediaID` (`mediaID`),
  ADD KEY `userID` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
