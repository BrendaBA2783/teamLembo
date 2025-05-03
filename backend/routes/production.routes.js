const express = require('express');
const router = express.Router();
const ProductionController = require('../controllers/production.controller');

// Ruta para crear una nueva producción
router.post('/', ProductionController.createProduction);

module.exports = router; 