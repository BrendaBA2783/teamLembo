-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS lembo;
USE lembo;

-- Tabla de cultivos
CREATE TABLE IF NOT EXISTS crop (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    crop_type VARCHAR(100),
    crop_location VARCHAR(200),
    crop_size VARCHAR(50),
    crop_name VARCHAR(100),
    crop_state VARCHAR(20) DEFAULT 'active',
    crop_image VARCHAR(255),
    crop_description TEXT
);

-- Tabla de sensores
CREATE TABLE IF NOT EXISTS sensor (
    sensor_id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_type VARCHAR(100),
    sensor_name VARCHAR(100),
    sensor_state VARCHAR(20) DEFAULT 'active',
    unit_measure VARCHAR(50) NOT NULL,
    scan_time INT NOT NULL,
    sensor_description TEXT,
    sensor_image LONGTEXT
);

-- Tabla de insumos
CREATE TABLE IF NOT EXISTS supplies (
    supplies_id INT AUTO_INCREMENT PRIMARY KEY,
    supplies_type VARCHAR(100),
    supplies_cuantity INT,
    supplies_name VARCHAR(100),
    supplies_state VARCHAR(20) DEFAULT 'active',
    supplies_unit_value DECIMAL(10,2),
    supplies_total_value DECIMAL(10,2),
    supplies_measure VARCHAR(20),
    supplies_description TEXT
);

-- Tabla de ciclos
CREATE TABLE IF NOT EXISTS cycle (
    cycle_id INT AUTO_INCREMENT PRIMARY KEY,
    cycle_location VARCHAR(200),
    cycle_name VARCHAR(100),
    cycle_status VARCHAR(20) DEFAULT 'active',
    cycle_news TEXT,
    cycle_start_date DATE,
    cycle_end_date DATE,
    cycle_description TEXT
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    user_type enum('Administrador','Personal de apoyo','Visitante') NOT NULL,
    user_document_type varchar(50) NOT NULL,
    user_name varchar(20) NOT NULL,
    user_last_name varchar(50) NOT NULL,
    user_identification_number varchar(20) NOT NULL,
    user_phone varchar(20) NOT NULL,
    user_email varchar(100) NOT NULL,
    confirmation_email varchar(100) NOT NULL,
    user_state VARCHAR(20) DEFAULT 'active',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    update_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    UNIQUE KEY user_name (user_name),
    UNIQUE KEY user_identification_number (user_identification_number),
    UNIQUE KEY user_email (user_email)
);

-- Tabla de asociaciones (producción)
CREATE TABLE IF NOT EXISTS association (
    association_id INT AUTO_INCREMENT PRIMARY KEY,
    production_code VARCHAR(50) UNIQUE,
    production_name VARCHAR(100),
    production_location VARCHAR(200),
    production_start_date DATE,
    production_end_date DATE,
    production_description TEXT,
    crop_id INT,
    sensor_id INT,
    supplies_id INT,
    cycle_id INT,
    user_id INT,
    association_state VARCHAR(20) DEFAULT 'activo',
    FOREIGN KEY (crop_id) REFERENCES crop(crop_id),
    FOREIGN KEY (sensor_id) REFERENCES sensor(sensor_id),
    FOREIGN KEY (supplies_id) REFERENCES supplies(supplies_id),
    FOREIGN KEY (cycle_id) REFERENCES cycle(cycle_id),
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- Inserción de datos de prueba

-- Insertar cultivos
INSERT INTO crop (crop_type, crop_location, crop_size, crop_name, crop_state, crop_image, crop_description) VALUES
('Fruta', 'Zona Norte', '500m2', 'Fresas', 'active', 'fresas.jpg', 'Cultivo de fresas orgánicas'),
('Verdura', 'Zona Sur', '300m2', 'Tomates', 'active', 'tomates.jpg', 'Tomates cherry hidropónicos'),
('Cereal', 'Zona Este', '1000m2', 'Maíz', 'active', 'maiz.jpg', 'Maíz amarillo tradicional'),
('Leguminosa', 'Zona Oeste', '400m2', 'Frijoles', 'active', 'frijoles.jpg', 'Frijoles rojos orgánicos');

-- Insertar sensores
INSERT INTO sensor (sensor_type, sensor_name, sensor_state, unit_measure, scan_time, sensor_description, sensor_image) VALUES
('Temperatura', 'Sensor Temp-01', 'active', '°C', 10, 'Sensor de temperatura', ''),
('Humedad', 'Sensor Hum-01', 'active', '%', 5, 'Sensor de humedad', ''),
('pH', 'Sensor pH-01', 'active', 'pH', 1, 'Sensor de pH', ''),
('Luminosidad', 'Sensor Lum-01', 'active', 'Lux', 1, 'Sensor de luminosidad', '');

-- Insertar insumos
INSERT INTO supplies (supplies_type, supplies_cuantity, supplies_name, supplies_state, supplies_unit_value, supplies_total_value, supplies_measure, supplies_description) VALUES
('Fertilizante', 100, 'Abono Orgánico Plus', 'active', 25000.00, 2500000.00, 'kg', 'Abono orgánico certificado'),
('Pesticida', 50, 'BioControl', 'active', 35000.00, 1750000.00, 'l', 'Pesticida orgánico para control de plagas'),
('Semillas', 25, 'Semilla Premium', 'active', 45000.00, 1125000.00, 'kg', 'Semillas certificadas de alta calidad'),
('Sistema Riego', 10, 'IrrigaTech', 'active', 150000.00, 1500000.00, 'unidad', 'Sistema de riego por goteo automatizado');

-- Insertar ciclos
INSERT INTO cycle (cycle_location, cycle_name, cycle_status, cycle_news, cycle_start_date, cycle_end_date, cycle_description) VALUES
('Zona Norte', 'Ciclo Primavera 2024', 'active', 'Inicio exitoso del ciclo', '2024-03-21', '2024-06-21', 'Ciclo de cultivo primaveral'),
('Zona Sur', 'Ciclo Verano 2024', 'active', 'Preparación del terreno completada', '2024-06-22', '2024-09-22', 'Ciclo de cultivo de verano'),
('Zona Este', 'Ciclo Otoño 2024', 'active', 'Planificación en curso', '2024-09-23', '2024-12-21', 'Ciclo de cultivo de otoño'),
('Zona Oeste', 'Ciclo Invierno 2024', 'active', 'En fase de diseño', '2024-12-22', '2025-03-20', 'Ciclo de cultivo de invierno');

-- Insertar usuarios
INSERT INTO users (user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, confirmation_email, user_state) VALUES
('Administrador', 'CC', 'Carlos', 'Rodriguez', '1234567890', '3101234567', 'carlos.admin@lembo.com', 'carlos.admin@lembo.com', 'active'),
('Personal de apoyo', 'CC', 'Ana', 'Martinez', '2345678901', '3112345678', 'ana.martinez@lembo.com', 'ana.martinez@lembo.com', 'active'),
('Personal de apoyo', 'CC', 'Juan', 'Perez', '3456789012', '3123456789', 'juan.perez@lembo.com', 'juan.perez@lembo.com', 'active'),
('Visitante', 'CC', 'Maria', 'Lopez', '4567890123', '3134567890', 'maria.lopez@lembo.com', 'maria.lopez@lembo.com', 'active');

-- Insertar asociaciones
INSERT INTO association (production_code, production_name, production_location, production_start_date, production_end_date, production_description, crop_id, sensor_id, supplies_id, cycle_id, user_id, association_state) VALUES
('PROD-FRE-001', 'Producción Fresas 2024-1', 'Zona Norte', '2024-03-21', '2024-06-21', 'Producción de fresas orgánicas primavera', 1, 1, 1, 1, 1, 'activo'),
('PROD-TOM-001', 'Producción Tomates 2024-2', 'Zona Sur', '2024-06-22', '2024-09-22', 'Producción de tomates cherry verano', 2, 2, 2, 2, 2, 'activo'),
('PROD-MAI-001', 'Producción Maíz 2024-3', 'Zona Este', '2024-09-23', '2024-12-21', 'Producción de maíz otoño', 3, 3, 3, 3, 3, 'activo'),
('PROD-FRI-001', 'Producción Frijoles 2024-4', 'Zona Oeste', '2024-12-22', '2025-03-20', 'Producción de frijoles invierno', 4, 4, 4, 4, 4, 'activo'); 