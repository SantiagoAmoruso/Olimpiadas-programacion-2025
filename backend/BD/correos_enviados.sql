-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2025 a las 02:00:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paquetesturisticos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correos_enviados`
--

CREATE TABLE `correos_enviados` (
  `id_correo` int(11) NOT NULL,
  `destinatario` varchar(150) NOT NULL,
  `asunto` varchar(255) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `fecha_envio` datetime DEFAULT current_timestamp(),
  `tipo_destino` enum('cliente','sector_interno') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `correos_enviados`
--
ALTER TABLE `correos_enviados`
  ADD PRIMARY KEY (`id_correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `correos_enviados`
--
ALTER TABLE `correos_enviados`
  MODIFY `id_correo` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
