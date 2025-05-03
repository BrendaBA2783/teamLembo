-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2025 a las 05:35:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

-- Crear y seleccionar la base de datos
CREATE DATABASE IF NOT EXISTS lembo;
USE lembo;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `team_one`
--

-- -------------------------------------------------------
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crop`
--

CREATE TABLE `crop` (
  `crop_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `crop_type` varchar(50) NOT NULL,
  `crop_location` varchar(50) NOT NULL,
  `crop_size` varchar(20) NOT NULL,
  `crop_state` enum('active','inactive') DEFAULT NULL,
  `crop_name` varchar(30) NOT NULL,
  `crop_image` longblob DEFAULT NULL,
  `crop_description` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  UNIQUE KEY `crop_size` (`crop_size`),
  UNIQUE KEY `crop_description` (`crop_description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `crop`
--

INSERT INTO crop (crop_type, crop_location, crop_size, crop_state, crop_name, crop_description) VALUES
('Hortalizas', 'Zona Norte', '2 hectáreas', 'active', 'Tomate Cherry', 'Cultivo de tomates cherry orgánicos'),
('Frutal', 'Zona Sur', '3 hectáreas', 'active', 'Fresa Dulce', 'Cultivo de fresas variedad dulce'),
('Cereales', 'Zona Este', '5 hectáreas', 'active', 'Maíz Amarillo', 'Cultivo de maíz amarillo variedad ICA-109'),
('Leguminosas', 'Zona Oeste', '1 hectárea', 'inactive', 'Frijol Rojo', 'Cultivo de frijol rojo tipo arbustivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cycle`
--

CREATE TABLE `cycle` (
  `cycle_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cycle_location` varchar(40) NOT NULL,
  `cycle_name` varchar(35) NOT NULL,
  `cycle_status` enum('activo','inactivo') NOT NULL,
  `cycle_news` varchar(30) NOT NULL,
  `cycle_start_date` date NOT NULL,
  `cycle_end_date` date NOT NULL,
  `cycle_description` varchar(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cycle`
--

INSERT INTO cycle (cycle_location, cycle_name, cycle_status, cycle_news, cycle_start_date, cycle_end_date, cycle_description) VALUES
('Zona Norte', 'Ciclo Tomate 2025-1', 'activo', 'En desarrollo', '2025-01-01', '2025-04-30', 'Primer ciclo de tomate cherry del año'),
('Zona Sur', 'Ciclo Fresa 2025-1', 'activo', 'Iniciando', '2025-02-01', '2025-07-31', 'Ciclo principal de fresas'),
('Zona Este', 'Ciclo Maíz 2025', 'activo', 'En desarrollo', '2025-03-01', '2025-08-31', 'Ciclo único de maíz del año'),
('Zona Oeste', 'Ciclo Frijol 2025-1', 'inactivo', 'Finalizado', '2025-01-15', '2025-05-15', 'Primer ciclo de frijol del año');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `sensor_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sensor_measure` enum('m','cm','mm','kg','g','l','ml') NOT NULL,
  `sensor_type` varchar(30) NOT NULL,
  `sensor_scan_time` decimal(5,2) DEFAULT NULL,
  `sensor_name` varchar(35) NOT NULL,
  `sensor_status` enum('activo','inactivo') NOT NULL,
  `sensor_image` longblob DEFAULT NULL,
  `sensor_description` varchar(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO sensor (sensor_measure, sensor_type, sensor_scan_time, sensor_name, sensor_status, sensor_description) VALUES
('cm', 'Humedad Suelo', 5.00, 'HS-2000', 'activo', 'Sensor de humedad del suelo de alta precisión'),
('g', 'Peso', 1.00, 'PS-1000', 'activo', 'Sensor de peso para control de cosecha'),
('l', 'Riego', 2.00, 'SR-3000', 'activo', 'Sensor de control de riego automático'),
('cm', 'Temperatura', 3.00, 'DT-22', 'activo', 'Sensor de temperatura ambiental');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supplies`
--

CREATE TABLE `supplies` (
  `supplies_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `supplies_type` varchar(50) NOT NULL,
  `supplies_cuantity` int(11) NOT NULL,
  `supplies_name` varchar(100) NOT NULL,
  `supplies_state` enum('activo','inactivo') DEFAULT NULL,
  `supplies_unit_value` decimal(10,2) NOT NULL,
  `supplies_total_value` decimal(12,2) NOT NULL,
  `supplies_measure` enum('kg','l','unidad','m','cm','ml','g','pieza') NOT NULL,
  `supplies_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `supplies`
--

INSERT INTO supplies (supplies_type, supplies_cuantity, supplies_name, supplies_state, supplies_unit_value, supplies_total_value, supplies_measure, supplies_description) VALUES
('Fertilizante', 100, 'Abono Orgánico Plus', 'activo', 25000.00, 2500000.00, 'kg', 'Abono orgánico certificado'),
('Pesticida', 50, 'BioControl', 'activo', 35000.00, 1750000.00, 'l', 'Pesticida orgánico para control de plagas'),
('Semillas', 25, 'Semilla Premium', 'activo', 45000.00, 1125000.00, 'kg', 'Semillas certificadas de alta calidad'),
('Sistema Riego', 10, 'IrrigaTech', 'activo', 150000.00, 1500000.00, 'unidad', 'Sistema de riego por goteo automatizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_type` enum('Administrador','Personal de apoyo','Visitante') NOT NULL,
  `user_document_type` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_identification_number` varchar(20) NOT NULL,
  `user_phone` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `confirmation_email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_identification_number` (`user_identification_number`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO users (user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, confirmation_email) VALUES
('Administrador', 'CC', 'Carlos', 'Rodriguez', '1234567890', '3101234567', 'carlos.admin@lembo.com', 'carlos.admin@lembo.com'),
('Personal de apoyo', 'CC', 'Ana', 'Martinez', '2345678901', '3112345678', 'ana.martinez@lembo.com', 'ana.martinez@lembo.com'),
('Personal de apoyo', 'CC', 'Juan', 'Perez', '3456789012', '3123456789', 'juan.perez@lembo.com', 'juan.perez@lembo.com'),
('Visitante', 'CC', 'Maria', 'Lopez', '4567890123', '3134567890', 'maria.lopez@lembo.com', 'maria.lopez@lembo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `association`
--

CREATE TABLE `association` (
  `association_id` int(11) NOT NULL AUTO_INCREMENT,
  `production_code` varchar(20) NOT NULL,
  `production_name` varchar(100) NOT NULL,
  `production_location` varchar(100) NOT NULL,
  `production_start_date` date NOT NULL,
  `production_end_date` date NOT NULL,
  `production_description` text,
  `crop_id` int(11) NOT NULL,
  `sensor_id` int(11) NOT NULL,
  `supplies_id` int(11) NOT NULL,
  `cycle_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `association_state` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`association_id`),
  UNIQUE KEY `production_code` (`production_code`),
  CONSTRAINT `fk_association_crop` FOREIGN KEY (`crop_id`) REFERENCES `crop` (`crop_id`),
  CONSTRAINT `fk_association_sensor` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`sensor_id`),
  CONSTRAINT `fk_association_supplies` FOREIGN KEY (`supplies_id`) REFERENCES `supplies` (`supplies_id`),
  CONSTRAINT `fk_association_cycle` FOREIGN KEY (`cycle_id`) REFERENCES `cycle` (`cycle_id`),
  CONSTRAINT `fk_association_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `association`
--

INSERT INTO association (production_code, production_name, production_location, production_start_date, production_end_date, production_description, crop_id, sensor_id, supplies_id, cycle_id, user_id, association_state) VALUES 
('PROD-TOM-001', 'Producción Tomate 2025-1', 'Zona Norte', '2025-01-01', '2025-04-30', 'Producción de tomate cherry orgánico', 1, 1, 1, 1, 2, 'activo'),
('PROD-FRE-001', 'Producción Fresa 2025-1', 'Zona Sur', '2025-02-01', '2025-07-31', 'Producción de fresas variedad dulce', 2, 3, 4, 2, 2, 'activo'),
('PROD-MAI-001', 'Producción Maíz 2025', 'Zona Este', '2025-03-01', '2025-08-31', 'Producción de maíz amarillo', 3, 2, 3, 3, 3, 'activo'),
('PROD-FRI-001', 'Producción Frijol 2025-1', 'Zona Oeste', '2025-01-15', '2025-05-15', 'Producción de frijol rojo', 4, 4, 2, 4, 4, 'inactivo');

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `crop`
--
ALTER TABLE `crop`
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cycle`
--
ALTER TABLE `cycle`
  MODIFY `cycle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `supplies`
--
ALTER TABLE `supplies`
  MODIFY `supplies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
