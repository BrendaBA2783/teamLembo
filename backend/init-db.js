const mysql = require('mysql2/promise');

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root'
    });

    try {
        // Crear la base de datos si no existe
        await connection.query('DROP DATABASE IF EXISTS lembo');
        await connection.query('CREATE DATABASE lembo');
        console.log('Base de datos "lembo" creada');

        // Usar la base de datos
        await connection.query('USE lembo');

        // Crear tablas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS crop (
                crop_id INT AUTO_INCREMENT PRIMARY KEY,
                crop_type VARCHAR(100),
                crop_location VARCHAR(200),
                crop_size VARCHAR(50),
                crop_name VARCHAR(100),
                crop_state VARCHAR(20) DEFAULT 'active',
                crop_image VARCHAR(255),
                crop_description TEXT
            )
        `);
        console.log('Tabla "crop" creada');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS sensor (
                sensor_id INT AUTO_INCREMENT PRIMARY KEY,
                sensor_type VARCHAR(100),
                sensor_name VARCHAR(100),
                sensor_state VARCHAR(20) DEFAULT 'active'
            )
        `);
        console.log('Tabla "sensor" creada');

        await connection.query(`
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
            )
        `);
        console.log('Tabla "supplies" creada');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS cycle (
                cycle_id INT AUTO_INCREMENT PRIMARY KEY,
                cycle_location VARCHAR(200),
                cycle_name VARCHAR(100),
                cycle_status VARCHAR(20) DEFAULT 'active',
                cycle_news TEXT,
                cycle_start_date DATE,
                cycle_end_date DATE,
                cycle_description TEXT
            )
        `);
        console.log('Tabla "cycle" creada');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id_user INT AUTO_INCREMENT PRIMARY KEY,
                user_type enum('Administrador','Personal de apoyo','Visitante') NOT NULL,
                user_document_type varchar(50) NOT NULL,
                user_name varchar(20) NOT NULL,
                user_last_name varchar(50) NOT NULL,
                user_identification_number varchar(20) NOT NULL,
                user_phone int(11) NOT NULL,
                user_email varchar(100) NOT NULL,
                confirmation_email varchar(100) NOT NULL,
                user_state VARCHAR(20) DEFAULT 'active',
                created_at timestamp NOT NULL DEFAULT current_timestamp(),
                update_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                UNIQUE KEY user_name (user_name),
                UNIQUE KEY user_identification_number (user_identification_number),
                UNIQUE KEY user_email (user_email)
            )
        `);
        console.log('Tabla "users" creada');

        await connection.query(`
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
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        `);
        console.log('Tabla "association" creada');

        // Insertar algunos datos de prueba
        const [cropResult] = await connection.query(`
            INSERT INTO crop (crop_type, crop_location, crop_size, crop_name, crop_state)
            VALUES ('Fruta', 'Campo A', '100m2', 'Manzanas', 'active')
        `);
        console.log('Cultivo insertado con ID:', cropResult.insertId);

        const [sensorResult] = await connection.query(`
            INSERT INTO sensor (sensor_type, sensor_name, sensor_state)
            VALUES ('Temperatura', 'Sensor Temp 1', 'active')
        `);
        console.log('Sensor insertado con ID:', sensorResult.insertId);

        const [suppliesResult] = await connection.query(`
            INSERT INTO supplies (supplies_type, supplies_name, supplies_state)
            VALUES ('Fertilizante', 'NPK Plus', 'active')
        `);
        console.log('Insumo insertado con ID:', suppliesResult.insertId);

        const [cycleResult] = await connection.query(`
            INSERT INTO cycle (cycle_name, cycle_status)
            VALUES ('Ciclo Primavera 2024', 'active')
        `);
        console.log('Ciclo insertado con ID:', cycleResult.insertId);

        const [userResult] = await connection.query(`
            INSERT INTO users (
                user_type,
                user_document_type,
                user_name,
                user_last_name,
                user_identification_number,
                user_phone,
                user_email,
                confirmation_email,
                user_state
            ) VALUES (
                'Administrador',
                'CC',
                'Juan',
                'Pérez',
                '1234567890',
                3101234567,
                'juan.perez@lembo.com',
                'juan.perez@lembo.com',
                'active'
            )
        `);
        console.log('Usuario insertado con ID:', userResult.insertId);

        // Insertar una asociación de prueba usando los IDs generados
        await connection.query(`
            INSERT INTO association (
                production_code,
                production_name,
                production_location,
                production_start_date,
                production_end_date,
                production_description,
                crop_id,
                sensor_id,
                supplies_id,
                cycle_id,
                user_id,
                association_state
            ) VALUES (
                'PROD-01012024-0001',
                'Producción de Manzanas',
                'Campo A',
                '2024-01-01',
                '2024-12-31',
                'Producción de manzanas para el año 2024',
                ?,
                ?,
                ?,
                ?,
                ?,
                'activo'
            )
        `, [cropResult.insertId, sensorResult.insertId, suppliesResult.insertId, cycleResult.insertId, userResult.insertId]);

        console.log('Datos de prueba insertados');
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error; // Propagar el error para que podamos verlo
    } finally {
        await connection.end();
    }
}

initializeDatabase(); 