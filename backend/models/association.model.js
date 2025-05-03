const db = require('../config/database');

class AssociationModel {
  async getAll() {
    const query = `
      SELECT a.*, c.crop_name, s.sensor_name, sup.supplies_name, 
             cy.cycle_name, CONCAT(u.user_name, ' ', u.user_last_name) as user_full_name
      FROM association a
      JOIN crop c ON a.crop_id = c.crop_id
      JOIN sensor s ON a.sensor_id = s.sensor_id
      JOIN supplies sup ON a.supplies_id = sup.supplies_id
      JOIN cycle cy ON a.cycle_id = cy.cycle_id
      JOIN users u ON a.user_id = u.id_user
    `;
    const [rows] = await db.query(query);
    return rows;
  }

  async toggleState(id, state) {
    const query = 'UPDATE association SET association_state = ? WHERE association_id = ?';
    const [result] = await db.query(query, [state, id]);
    return result.affectedRows > 0;
  }

  async create(associationData) {
    const query = 'INSERT INTO association SET ?';
    const [result] = await db.query(query, [associationData]);
    return result.insertId;
  }

  async update(id, associationData) {
    const query = 'UPDATE association SET ? WHERE association_id = ?';
    const [result] = await db.query(query, [associationData, id]);
    return result.affectedRows > 0;
  }
}

module.exports = new AssociationModel();
