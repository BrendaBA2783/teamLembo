const express = require('express');
const router = express.Router();
const AssociationController = require('../controllers/association.controller');
const { validateAssociation } = require('../middleware/validation.middleware');

router.get('/', AssociationController.getAssociations);
router.put('/:id/state', AssociationController.toggleState);
router.get('/export', AssociationController.exportData);
router.post('/', validateAssociation, AssociationController.create);
router.put('/:id', validateAssociation, AssociationController.update);

module.exports = router;
