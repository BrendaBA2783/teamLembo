const db = require('../config/database');

// Valores permitidos para el tipo de usuario
const VALID_USER_TYPES = ['Administrador', 'Personal de apoyo', 'Visitante'];

class UserController {
    async getAll(req, res) {
        try {
            const query = `
                SELECT 
                    id_user as _id,
                    user_type as tipo,
                    user_name as nombre,
                    user_last_name as apellido,
                    user_identification_number as documento,
                    user_phone as telefono,
                    user_email as email,
                    CASE 
                        WHEN update_at > created_at THEN 'inactivo'
                        ELSE 'activo'
                    END as estado
                FROM users
                ORDER BY user_name
            `;
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const query = `
                SELECT 
                    id_user as _id,
                    user_type as tipo,
                    user_document_type as tipo_documento,
                    user_name as nombre,
                    user_last_name as apellido,
                    user_identification_number as documento,
                    user_phone as telefono,
                    user_email as email,
                    CASE 
                        WHEN update_at > created_at THEN 'inactivo'
                        ELSE 'activo'
                    END as estado
                FROM users
                WHERE id_user = ?
            `;
            
            const [rows] = await db.query(query, [id]);
            
            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario',
                error: error.message
            });
        }
    }

    async toggleState(req, res) {
        try {
            const { ids } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere un array de IDs de usuarios'
                });
            }

            // Obtener el estado actual de los usuarios
            const [users] = await db.query(
                'SELECT id_user, update_at, created_at FROM users WHERE id_user IN (?)',
                [ids]
            );

            // Preparar las consultas para actualizar cada usuario
            const updates = users.map(user => {
                const isActive = user.update_at <= user.created_at;
                return db.query(
                    'UPDATE users SET update_at = ? WHERE id_user = ?',
                    [isActive ? new Date() : user.created_at, user.id_user]
                );
            });

            // Ejecutar todas las actualizaciones
            await Promise.all(updates);

            res.json({
                success: true,
                message: 'Estados de usuarios actualizados exitosamente'
            });

        } catch (error) {
            console.error('Error al actualizar estados:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar los estados de los usuarios',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const {
                user_type,
                user_document_type,
                user_name,
                user_last_name,
                user_identification_number,
                user_phone,
                user_email,
                confirmation_email
            } = req.body;

            // Validaciones básicas
            if (!user_type || !user_document_type || !user_name || !user_last_name || 
                !user_identification_number || !user_phone || !user_email || !confirmation_email) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos'
                });
            }

            // Validar tipo de usuario
            if (!VALID_USER_TYPES.includes(user_type)) {
                return res.status(400).json({
                    success: false,
                    message: `Tipo de usuario inválido. Debe ser uno de: ${VALID_USER_TYPES.join(', ')}`
                });
            }

            if (user_email !== confirmation_email) {
                return res.status(400).json({
                    success: false,
                    message: 'Los correos electrónicos no coinciden'
                });
            }

            // Verificar si el usuario ya existe
            const [existingUser] = await db.query(
                'SELECT * FROM users WHERE user_identification_number = ? OR user_email = ?',
                [user_identification_number, user_email]
            );

            if (existingUser.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un usuario con este número de identificación o correo electrónico'
                });
            }

            // Insertar nuevo usuario
            const query = `
                INSERT INTO users (
                    user_type,
                    user_document_type,
                    user_name,
                    user_last_name,
                    user_identification_number,
                    user_phone,
                    user_email,
                    confirmation_email
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [result] = await db.query(query, [
                user_type,
                user_document_type,
                user_name,
                user_last_name,
                user_identification_number,
                user_phone,
                user_email,
                confirmation_email
            ]);

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                userId: result.insertId
            });

        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el usuario',
                error: error.message
            });
        }
    }
}

module.exports = new UserController(); 