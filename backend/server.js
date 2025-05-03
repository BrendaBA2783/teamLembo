const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: err.message
    });
});

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'API de Lembo funcionando correctamente' });
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Rutas disponibles:');
    console.log('- GET /api/crop');
    console.log('- GET /api/sensor');
    console.log('- GET /api/supplies');
    console.log('- GET /api/cycle');
    console.log('- GET /api/users');
    console.log('- POST /api/production');
});
