const db = require('../config/database');

class SensorController {
    async getAll(req, res) {
        try {
            const query = `
                SELECT 
                    sensor_id,
                    sensor_type,
                    sensor_name,
                    unit_measure,
                    scan_time,
                    sensor_state,
                    sensor_image,
                    sensor_description
                FROM sensor
                ORDER BY sensor_id DESC
            `;
            
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener sensores:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los sensores',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const query = `
                SELECT 
                    sensor_id,
                    sensor_type,
                    sensor_name,
                    unit_measure,
                    scan_time,
                    sensor_state,
                    sensor_image,
                    sensor_description
                FROM sensor
                WHERE sensor_id = ?
            `;

            const [rows] = await db.query(query, [id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Sensor no encontrado'
                });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error('Error al obtener el sensor:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el sensor',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const {
                sensor_type,
                sensor_name,
                unit_measure,
                scan_time,
                sensor_state,
                sensor_image,
                sensor_description
            } = req.body;

            // Validar datos requeridos
            if (!sensor_type || !sensor_name || !unit_measure || !scan_time) {
                return res.status(400).json({
                    success: false,
                    message: 'Los campos tipo, nombre, unidad de medida y tiempo de escaneo son requeridos'
                });
            }

            const query = `
                INSERT INTO sensor (
                    sensor_type,
                    sensor_name,
                    unit_measure,
                    scan_time,
                    sensor_state,
                    sensor_image,
                    sensor_description
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                sensor_type,
                sensor_name,
                unit_measure,
                scan_time,
                sensor_state || 'activo',
                sensor_image || null,
                sensor_description || null
            ];

            const [result] = await db.query(query, values);

            res.status(201).json({
                success: true,
                message: 'Sensor creado exitosamente',
                sensorId: result.insertId
            });
        } catch (error) {
            console.error('Error al crear sensor:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el sensor',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                sensor_type,
                sensor_name,
                unit_measure,
                scan_time,
                sensor_state,
                sensor_image,
                sensor_description
            } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere el ID del sensor'
                });
            }

            const query = `
                UPDATE sensor 
                SET 
                    sensor_type = ?,
                    sensor_name = ?,
                    unit_measure = ?,
                    scan_time = ?,
                    sensor_state = ?,
                    sensor_image = ?,
                    sensor_description = ?
                WHERE sensor_id = ?
            `;

            const values = [
                sensor_type,
                sensor_name,
                unit_measure,
                scan_time,
                sensor_state,
                sensor_image,
                sensor_description,
                id
            ];

            const [result] = await db.query(query, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Sensor no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Sensor actualizado exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar sensor:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el sensor',
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

            const query = 'UPDATE sensor SET sensor_state = ? WHERE sensor_id = ?';
            const [result] = await db.query(query, [state, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Sensor no encontrado'
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

module.exports = new SensorController(); 