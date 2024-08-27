-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 09:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `appliedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `jobId`, `userId`, `status`, `appliedAt`, `createdAt`, `updatedAt`) VALUES
(5, 4, 4, 'pending', '2024-08-26 20:25:46', '2024-08-26 20:25:46', '2024-08-26 20:25:46'),
(6, 5, 4, 'pending', '2024-08-27 04:02:14', '2024-08-27 04:02:14', '2024-08-27 04:02:14');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `contract` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `companyName`, `position`, `contract`, `location`, `description`, `createdAt`, `updatedAt`) VALUES
(4, 'TCSs', 'SOFTWARE ENGINEER', 'Part-Time', 'Mumbai', 'JD', '2024-08-26 19:17:53', '2024-08-27 03:58:49'),
(5, 'Wipro', 'Front End Engineer', 'Fulltime', 'Mumbai', 'JD', '2024-08-26 20:45:15', '2024-08-27 03:21:33'),
(6, 'Alphaware ', 'Front End', 'Fulltime', 'Mumbai', 'JD', '2024-08-27 03:22:01', '2024-08-27 03:22:01'),
(7, 'Testing Job', 'tester', 'Part Time', 'Pune', 'JD Testers', '2024-08-27 04:07:33', '2024-08-27 04:08:07');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240826130307-create-user.js'),
('20240826130310-create-job.js'),
('20240826185939-create-jobs-table.js'),
('20240826192601-create-applications-table.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'amaan syed', 'amaan@alphaware.com', '$2a$10$h8tKi/Z9hVe6v8IqoOqMR.uoFPRFA1KlsAmzz1dqoDzZeugr1h1yG', 'admin', '2024-08-26 13:11:45', '2024-08-26 13:11:45'),
(2, 'syed', 'syed@gmail.com', '$2a$10$vDDno8BvZ3sNQLeIAGyQbOhRqsCktuoORGZZwCLZZXtbFocgfVKpW', 'user', '2024-08-26 13:48:56', '2024-08-26 13:48:56'),
(4, 'test', 'test@gmail.com', '$2a$10$3eRZlXKjQSM.7NAdT.TpMeHNoS1fVAj1UJW4p9cre5NX6atqudmf.', 'user', '2024-08-26 15:35:36', '2024-08-26 15:35:36'),
(5, 'test2', 'test2@gmail.com', '$2a$10$GcSBgVp3QU746UfUkCT2G.DASSBNjik8NIl9vpF5WM/Ky0B9WDtfu', 'user', '2024-08-26 15:46:05', '2024-08-26 15:46:05'),
(6, 'usertest', 'usertest@alphawarenext.com', '$2a$10$MURjPwQOx4Bwyu7DLoPldOk2wXM4GfuQH1JPlenl9uo75XsNWOz86', 'user', '2024-08-26 15:50:19', '2024-08-26 15:50:19'),
(7, 'admin2', 'admin2@alphaware.com', '$2a$10$98Evj3W4VLuvsbZjBQulWeUWqtp.Ey6JW5v1KM5xhWZtUwZ6DmmTC', 'admin', '2024-08-26 15:52:39', '2024-08-26 15:52:39'),
(8, 'tester', 'my@gmail.com', '$2a$10$QSmUMuFSk4E0tM5p.b8bVerPHqUBBRkge4o0UOBHqdINphO2nWk56', 'user', '2024-08-27 04:09:01', '2024-08-27 04:09:01'),
(9, 'testuser', 'testeuser@gmail.com', '$2a$10$NDiofqs0xa9UIyW9bwPssekzkT7GdZ/oqRSltv6qU6UHNQBYVzpwi', 'user', '2024-08-27 04:18:58', '2024-08-27 04:18:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobId` (`jobId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
