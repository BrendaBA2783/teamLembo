const db = require('../config/database');

class CycleController {
    async getAll(req, res) {
        try {
            const query = `
                SELECT 
                    cycle_id as id,
                    cycle_name as name
                FROM cycle 
                WHERE cycle_status = 'activo'
            `;
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener ciclos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los ciclos',
                error: error.message
            });
        }
    }
}

module.exports = new CycleController(); 