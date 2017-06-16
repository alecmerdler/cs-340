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
-- Table structure for table `Views`
--

CREATE TABLE `Views` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(11) NOT NULL,
  `mediaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Views`
--

INSERT INTO `Views` (`id`, `timestamp`, `userID`, `mediaID`) VALUES
(11, '2017-06-11 23:33:22', 25, 1),
(12, '2017-06-11 23:54:10', 27, 1),
(13, '2017-06-11 23:57:17', 27, 1),
(14, '2017-06-13 07:52:30', 24, 1),
(15, '2017-06-13 07:52:46', 24, 1),
(16, '2017-06-13 07:54:12', 24, 1),
(17, '2017-06-13 18:01:11', 28, 9),
(18, '2017-06-15 22:34:02', 41, 4),
(20, '2017-06-15 23:08:57', 41, 1),
(22, '2017-06-15 23:11:58', 41, 4),
(23, '2017-06-15 23:16:38', 41, 4),
(24, '2017-06-15 23:26:56', 41, 4),
(25, '2017-06-15 23:26:58', 41, 4),
(26, '2017-06-15 23:27:03', 41, 4),
(27, '2017-06-15 23:27:04', 41, 4),
(28, '2017-06-15 23:27:04', 41, 4),
(29, '2017-06-15 23:54:20', 41, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Views`
--
ALTER TABLE `Views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `mediaID` (`mediaID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Views`
--
ALTER TABLE `Views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Views`
--
ALTER TABLE `Views`
  ADD CONSTRAINT `Views_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Views_ibfk_2` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
