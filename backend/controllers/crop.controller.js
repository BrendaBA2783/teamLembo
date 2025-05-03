const db = require('../config/database');

class CropController {
    async getAll(req, res) {
        try {
            const query = `
                SELECT 
                    crop_id,
                    crop_type,
                    crop_location,
                    crop_size,
                    crop_name,
                    crop_state,
                    crop_image,
                    crop_description
                FROM crop
                ORDER BY crop_id DESC
            `;
            
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener cultivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los cultivos',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const {
                crop_type,
                crop_location,
                crop_size,
                crop_name,
                crop_state,
                crop_image,
                crop_description
            } = req.body;

            // Validar datos requeridos
            if (!crop_type || !crop_location || !crop_size || !crop_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Los campos tipo, ubicación, tamaño y nombre son requeridos'
                });
            }

            const query = `
                INSERT INTO crop (
                    crop_type,
                    crop_location,
                    crop_size,
                    crop_name,
                    crop_state,
                    crop_image,
                    crop_description
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                crop_type,
                crop_location,
                crop_size,
                crop_name,
                crop_state || 'activo',
                crop_image || null,
                crop_description || null
            ];

            const [result] = await db.query(query, values);

            res.status(201).json({
                success: true,
                message: 'Cultivo creado exitosamente',
                cropId: result.insertId
            });
        } catch (error) {
            console.error('Error al crear cultivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el cultivo',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                crop_type,
                crop_location,
                crop_size,
                crop_name,
                crop_state,
                crop_image,
                crop_description
            } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere el ID del cultivo'
                });
            }

            const query = `
                UPDATE crop 
                SET 
                    crop_type = ?,
                    crop_location = ?,
                    crop_size = ?,
                    crop_name = ?,
                    crop_state = ?,
                    crop_image = ?,
                    crop_description = ?
                WHERE crop_id = ?
            `;

            const values = [
                crop_type,
                crop_location,
                crop_size,
                crop_name,
                crop_state,
                crop_image,
                crop_description,
                id
            ];

            const [result] = await db.query(query, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Cultivo no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Cultivo actualizado exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar cultivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el cultivo',
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

            const query = 'UPDATE crop SET crop_state = ? WHERE crop_id = ?';
            const [result] = await db.query(query, [state, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Cultivo no encontrado'
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

    async getById(req, res) {
        try {
            const { id } = req.params;

            const query = `
                SELECT 
                    crop_id,
                    crop_type,
                    crop_location,
                    crop_size,
                    crop_name,
                    crop_state,
                    crop_image,
                    crop_description
                FROM crop
                WHERE crop_id = ?
            `;

            const [rows] = await db.query(query, [id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Cultivo no encontrado'
                });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error('Error al obtener el cultivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el cultivo',
                error: error.message
            });
        }
    }
}

module.exports = new CropController(); 