const db = require('../config/database');

class AssociationController {
  async getAssociations(req, res) {
    try {
      const query = `
        SELECT 
          a.association_id,
          a.production_code,
          a.production_name,
          a.production_location,
          a.production_start_date,
          a.production_end_date,
          a.association_state,
          c.crop_name,
          s.sensor_name,
          sup.supplies_name,
          cy.cycle_name,
          CONCAT(u.user_name, ' ', u.user_last_name) as user_name
        FROM association a
        LEFT JOIN crop c ON a.crop_id = c.crop_id
        LEFT JOIN sensor s ON a.sensor_id = s.sensor_id
        LEFT JOIN supplies sup ON a.supplies_id = sup.supplies_id
        LEFT JOIN cycle cy ON a.cycle_id = cy.cycle_id
        LEFT JOIN users u ON a.user_id = u.id_user
        ORDER BY a.association_id DESC
      `;

      const [rows] = await db.query(query);
      console.log('Filas obtenidas:', rows); // Para depuración
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener asociaciones:', error);
      console.error('Query que causó el error:', error.sql); // Para depuración
      res.status(500).json({
        success: false,
        message: 'Error al obtener las asociaciones',
        error: error.message
      });
    }
  }

  async toggleState(req, res) {
    try {
      const { id } = req.params;
      const { state } = req.body;

      if (!id || !state) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere ID y estado'
        });
      }

      const query = 'UPDATE association SET association_state = ? WHERE association_id = ?';
      await db.query(query, [state, id]);

      res.json({
        success: true,
        message: 'Estado actualizado correctamente'
      });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el estado',
        error: error.message
      });
    }
  }

  async getAssociationById(req, res) {
    try {
      const { id } = req.params;
      
      const query = `
        SELECT 
          a.*,
          c.crop_name,
          s.sensor_name,
          sup.supplies_name,
          cy.cycle_name,
          CONCAT(u.user_name, ' ', u.user_last_name) as user_full_name,
          u.user_type
        FROM association a
        LEFT JOIN crop c ON a.crop_id = c.crop_id
        LEFT JOIN sensor s ON a.sensor_id = s.sensor_id
        LEFT JOIN supplies sup ON a.supplies_id = sup.supplies_id
        LEFT JOIN cycle cy ON a.cycle_id = cy.cycle_id
        LEFT JOIN users u ON a.user_id = u.id_user
        WHERE a.association_id = ?
      `;

      const [rows] = await db.query(query, [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Asociación no encontrada'
        });
      }

      res.json(rows[0]);
    } catch (error) {
      console.error('Error al obtener la asociación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la asociación',
        error: error.message
      });
    }
  }
}

module.exports = new AssociationController();
