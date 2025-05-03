const db = require('../config/database');

class SuppliesController {
    async getAll(req, res) {
        try {
            const query = `
                SELECT 
                    supplies_id,
                    supplies_type,
                    supplies_cuantity,
                    supplies_name,
                    supplies_state,
                    supplies_unit_value,
                    supplies_total_value,
                    supplies_measure,
                    supplies_description
                FROM supplies
                ORDER BY supplies_id DESC
            `;
            
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener insumos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los insumos',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const query = `
                SELECT 
                    supplies_id,
                    supplies_type,
                    supplies_cuantity,
                    supplies_name,
                    supplies_state,
                    supplies_unit_value,
                    supplies_total_value,
                    supplies_measure,
                    supplies_description
                FROM supplies
                WHERE supplies_id = ?
            `;

            const [rows] = await db.query(query, [id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Insumo no encontrado'
                });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error('Error al obtener el insumo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el insumo',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const {
                supplies_type,
                supplies_cuantity,
                supplies_name,
                supplies_state,
                supplies_unit_value,
                supplies_total_value,
                supplies_measure,
                supplies_description
            } = req.body;

            // Validar datos requeridos
            if (!supplies_type || !supplies_name || !supplies_cuantity || !supplies_measure) {
                return res.status(400).json({
                    success: false,
                    message: 'Los campos tipo, nombre, cantidad y unidad de medida son requeridos'
                });
            }

            // Calcular el valor total si no se proporciona
            const total_value = supplies_total_value || (supplies_unit_value * supplies_cuantity);

            const query = `
                INSERT INTO supplies (
                    supplies_type,
                    supplies_cuantity,
                    supplies_name,
                    supplies_state,
                    supplies_unit_value,
                    supplies_total_value,
                    supplies_measure,
                    supplies_description
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                supplies_type,
                supplies_cuantity,
                supplies_name,
                supplies_state || 'active',
                supplies_unit_value || 0,
                total_value,
                supplies_measure,
                supplies_description || null
            ];

            const [result] = await db.query(query, values);

            res.status(201).json({
                success: true,
                message: 'Insumo creado exitosamente',
                suppliesId: result.insertId
            });
        } catch (error) {
            console.error('Error al crear insumo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el insumo',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                supplies_type,
                supplies_cuantity,
                supplies_name,
                supplies_state,
                supplies_unit_value,
                supplies_total_value,
                supplies_measure,
                supplies_description
            } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere el ID del insumo'
                });
            }

            // Calcular el valor total si se actualizó la cantidad o el valor unitario
            const total_value = supplies_total_value || (supplies_unit_value * supplies_cuantity);

            const query = `
                UPDATE supplies 
                SET 
                    supplies_type = ?,
                    supplies_cuantity = ?,
                    supplies_name = ?,
                    supplies_state = ?,
                    supplies_unit_value = ?,
                    supplies_total_value = ?,
                    supplies_measure = ?,
                    supplies_description = ?
                WHERE supplies_id = ?
            `;

            const values = [
                supplies_type,
                supplies_cuantity,
                supplies_name,
                supplies_state,
                supplies_unit_value,
                total_value,
                supplies_measure,
                supplies_description,
                id
            ];

            const [result] = await db.query(query, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Insumo no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Insumo actualizado exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar insumo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el insumo',
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

            const query = 'UPDATE supplies SET supplies_state = ? WHERE supplies_id = ?';
            const [result] = await db.query(query, [state, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Insumo no encontrado'
                });
            }

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
}

module.exports = new SuppliesController(); 