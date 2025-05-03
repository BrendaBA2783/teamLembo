const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rutas de usuarios
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/users', userController.create);
router.put('/users/toggle-state', userController.toggleState);

module.exports = router; 