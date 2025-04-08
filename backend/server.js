// 📌 Importación de módulos necesarios
const express = require('express'); // Framework para crear el servidor
const cors = require('cors'); // Middleware para manejar políticas de CORS

require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const usersRoutes = require('./routes/registerRoutes'); // Importa las rutas de registro

// 📌 Creación de la aplicación Express
const app = express();

// 📌 Middlewares
app.use(express.json()); // Habilita el soporte para recibir JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios

// 📌 Rutas
app.use('/user', usersRoutes); // Asigna las rutas de usuario al prefijo '/user'

// 📌 Configuración del puerto
const PORT = process.env.PORT || 3000; // Usa el puerto de las variables de entorno o el 3000 por defecto

// 📌 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación
});
