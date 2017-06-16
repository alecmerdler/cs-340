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
-- Table structure for table `Recommendations`
--

CREATE TABLE `Recommendations` (
  `id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `mediaID` int(11) NOT NULL,
  `recommenderID` int(11) NOT NULL,
  `recommendedToID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Recommendations`
--

INSERT INTO `Recommendations` (`id`, `message`, `mediaID`, `recommenderID`, `recommendedToID`) VALUES
(4, 'I really enjoyed the depth and feel of this movie. The ending is one of the best I\'ve honestly ever witnessed. I think you will really enjoy it.', 1, 24, 25),
(5, 'I think you would really like this movie. It\'s like the first one, but better.', 3, 26, 24),
(6, 'I still can\'t believe you haven\'t seen GoT yet! Seriously man, it\'s 2017. Just make some popcorn, sit down, and binge watch all the seasons over the course of 3 weeks. You\'ll thank me.', 9, 28, 24),
(7, 'Hey Phil, I think you would really like this movie. Check it out!', 1, 41, 26);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Recommendations`
--
ALTER TABLE `Recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mediaID` (`mediaID`),
  ADD KEY `userID` (`recommenderID`),
  ADD KEY `recommendedToID` (`recommendedToID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Recommendations`
--
ALTER TABLE `Recommendations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Recommendations`
--
ALTER TABLE `Recommendations`
  ADD CONSTRAINT `Recommendations_ibfk_1` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Recommendations_ibfk_2` FOREIGN KEY (`recommenderID`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Recommendations_ibfk_3` FOREIGN KEY (`recommendedToID`) REFERENCES `Users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
