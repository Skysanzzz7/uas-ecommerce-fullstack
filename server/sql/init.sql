-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2025 at 04:50 AM
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
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_harga`, `status`, `created_at`) VALUES
(1, 2, 220000, 'paid', '2025-11-22 03:50:14'),
(2, 2, 110000, 'paid', '2025-11-23 11:59:21'),
(3, 2, 2090000, 'paid', '2025-11-23 11:59:43'),
(4, 1, 110000, 'paid', '2025-11-23 12:05:53'),
(5, 2, 110000, 'paid', '2025-11-23 12:13:08'),
(6, 1, 110000, 'paid', '2025-11-24 01:55:24'),
(7, 1, 110000, 'paid', '2025-11-24 02:01:47'),
(8, 1, 105000, 'paid', '2025-11-24 02:44:21'),
(9, 3, 330000, 'paid', '2025-11-24 03:20:28'),
(10, 2, 110000, 'paid', '2025-11-24 03:46:41');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_per_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price_per_item`) VALUES
(1, 1, 1, 1, 110000),
(2, 1, 2, 1, 110000),
(3, 2, 2, 1, 110000),
(4, 3, 2, 19, 110000),
(5, 4, 1, 1, 110000),
(6, 5, 2, 1, 110000),
(7, 6, 2, 1, 110000),
(8, 7, 2, 1, 110000),
(10, 9, 1, 3, 110000),
(11, 10, 5, 1, 110000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `harga_barang` int(10) UNSIGNED NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `stock_barang` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `gambar_url` varchar(500) DEFAULT 'https://via.placeholder.com/400x300?text=No+Image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `nama_barang`, `harga_barang`, `deskripsi`, `stock_barang`, `created_at`, `gambar_url`) VALUES
(1, 'BDGCLUB SS25CYNEP (BL) T-SHIRT', 110000, 'Cotton Combed 20s with Plastisol Screen Printing', 20, '2025-11-22 02:57:52', '/public/BDGCLUB SS25CYNEP (BL) T-SHIRT.jpeg'),
(2, 'BDGCLUB SS25EMJ (WH) T-SHIRT', 110000, 'Cotton Combed 20s with Direct To Film (DTF) Screen Printing', 20, '2025-11-22 02:57:52', '/public/BDGCLUB SS25EMJ (WH) T-SHIRT.jpeg'),
(3, 'BDGCLUB SS25NEPCNB (WH) T-SHIRT', 120000, 'Cotton Combed 20s Plastisol Screen Printing', 10, '2025-11-22 02:57:52', '\\public\\BDGCLUB SS25NEPCNB (WH) T-SHIRT.jpeg'),
(4, 'BDGCLUB SS25022CMS (WH) T-SHIRT', 120000, 'Cotton Combed 20s Plastisol Screen Printing', 20, '2025-11-22 02:57:52', '\\public\\BDGCLUB SS25022CMS (WH) T-SHIRT.jpeg'),
(5, 'BDGCLUB SS25B2B4STARS (BL) T-SHIRT', 110000, 'Cotton Combed 24s Plastisol Screen Printing', 19, '2025-11-22 02:57:52', '/public/BDGCLUB SS25B2B4STARS (BL) T-SHIRT (BS).jpg'),
(6, 'STIKER PACK BDGCLUB', 35000, 'Stiker 7PCS & Keychain Acrylic 1PCS', 20, '2025-11-24 02:31:48', '/public/STICKERPACK.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$nZp4P6XxRDNWs1HN/E51KuWiJ.D55VoKt4M6UMow8yCSZWyhUWLGK', 'admin', '2025-11-22 03:21:36'),
(2, 'skysanzz', 'user1@gmail.com', '$2b$10$5xGVOKWU76/lbPgHEgjmae..azqkbRoB7/fbjN7ippEyDFiEibecG', 'user', '2025-11-22 03:10:29'),
(3, 'haritsyah', 'haritsyah18@gmail.com', '$2b$10$TL1H8pcZQHWRfFWaqsJ6qO4eF71dpEsMmhsWilmaj2Js5/xvQEyDS', 'user', '2025-11-24 03:11:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `fk_order_items_product` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
