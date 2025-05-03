const mysql = require('mysql2/promise');

// Configuración de la conexión
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lembo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

// Verificar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Base de datos conectada exitosamente');
        
        // Verificar si la base de datos existe
        const [dbResult] = await connection.query('SHOW DATABASES LIKE ?', [config.database]);
        if (dbResult.length === 0) {
            console.error(`La base de datos '${config.database}' no existe`);
            // Intentar crear la base de datos
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
            console.log(`Base de datos '${config.database}' creada`);
        }

        // Usar la base de datos
        await connection.query(`USE ${config.database}`);

        // Verificar si las tablas existen
        const [tables] = await connection.query('SHOW TABLES');
        console.log('Tablas existentes:', tables);

        connection.release();
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        console.error('Detalles de la configuración:', {
            host: config.host,
            user: config.user,
            database: config.database,
            password: '******' // No mostrar la contraseña real
        });
        throw error;
    }
}

// Ejecutar la prueba de conexión
testConnection().catch(error => {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1); // Terminar el proceso si hay un error crítico
});

module.exports = pool;
