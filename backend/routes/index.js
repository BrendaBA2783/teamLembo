const express = require('express');
const router = express.Router();

// Importar rutas
const userRoutes = require('./user.routes');
const cropController = require('../controllers/crop.controller');
const sensorController = require('../controllers/sensor.controller');
const suppliesController = require('../controllers/supplies.controller');
const cycleController = require('../controllers/cycle.controller');
const productionController = require('../controllers/production.controller');
const associationController = require('../controllers/association.controller');

// Usar las rutas de usuario
router.use('/', userRoutes);

// Rutas para obtener datos de los selects
router.get('/crop', cropController.getAll);
router.get('/sensor', sensorController.getAll);
router.get('/supplies', suppliesController.getAll);
router.get('/cycle', cycleController.getAll);

// Ruta para crear producción
router.post('/production', productionController.createProduction);

// Rutas para asociaciones
router.get('/associations', associationController.getAssociations);
router.get('/associations/:id', associationController.getAssociationById);
router.put('/associations/:id/state', associationController.toggleState);

// Rutas para cultivos
router.get('/crop/:id', cropController.getById);
router.post('/crop', cropController.create);
router.put('/crop/:id', cropController.update);
router.put('/crop/:id/state', cropController.toggleState);

// Rutas para sensores
router.get('/sensor/:id', sensorController.getById);
router.post('/sensor', sensorController.create);
router.put('/sensor/:id', sensorController.update);
router.put('/sensor/:id/state', sensorController.toggleState);

// Rutas para insumos
router.get('/supplies/:id', suppliesController.getById);
router.post('/supplies', suppliesController.create);
router.put('/supplies/:id', suppliesController.update);
router.put('/supplies/:id/state', suppliesController.toggleState);

module.exports = router; 