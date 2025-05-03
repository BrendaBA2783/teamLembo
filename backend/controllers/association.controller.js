const AssociationModel = require('../models/association.model');
const { createPDF, createExcel } = require('../utils/export.utils');

class AssociationController {
  async getAssociations(req, res) {
    try {
      const associations = await AssociationModel.getAll();
      res.json(associations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async toggleState(req, res) {
    try {
      const { id } = req.params;
      const { state } = req.body;
      const success = await AssociationModel.toggleState(id, state);
      if (success) {
        res.json({ message: 'Estado actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Asociación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async exportData(req, res) {
    try {
      const { format } = req.query;
      const associations = await AssociationModel.getAll();
      
      if (format === 'pdf') {
        const pdf = await createPDF(associations);
        res.contentType('application/pdf').send(pdf);
      } else if (format === 'excel') {
        const excel = await createExcel(associations);
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
           .send(excel);
      } else {
        res.status(400).json({ message: 'Formato no soportado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AssociationController();
