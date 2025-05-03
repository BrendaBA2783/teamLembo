const db = require('../config/database');

class ProductionController {
  // Generar código de producción
  generateProductionCode = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    // Obtener el último código del año actual
    const query = `
      SELECT production_code 
      FROM association 
      WHERE production_code LIKE ? 
      ORDER BY production_code DESC 
      LIMIT 1
    `;
    
    try {
      const [rows] = await db.query(query, [`PROD-${day}${month}${year}%`]);
      let sequence = '0001';
      
      if (rows.length > 0) {
        const lastCode = rows[0].production_code;
        const lastSequence = parseInt(lastCode.slice(-4));
        sequence = String(lastSequence + 1).padStart(4, '0');
      }
      
      return `PROD-${day}${month}${year}-${sequence}`;
    } catch (error) {
      console.error('Error generando código de producción:', error);
      throw error;
    }
  }

  // Crear nueva producción
  createProduction = async (req, res) => {
    try {
      console.log('Iniciando creación de producción');
      console.log('Datos recibidos:', req.body);

      const {
        production_name,
        production_location,
        production_start_date,
        production_end_date,
        production_description,
        crop_id,
        sensor_id,
        supplies_id,
        cycle_id,
        user_id
      } = req.body;

      // Validar datos requeridos
      if (!production_name || !production_location || !production_start_date || !production_end_date || 
          !crop_id || !sensor_id || !supplies_id || !cycle_id || !user_id) {
        console.error('Datos faltantes:', req.body);
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos'
        });
      }

      // Generar código de producción
      const production_code = await this.generateProductionCode();
      console.log('Código de producción generado:', production_code);

      const query = `
        INSERT INTO association (
          production_code,
          production_name,
          production_location,
          production_start_date,
          production_end_date,
          production_description,
          crop_id,
          sensor_id,
          supplies_id,
          cycle_id,
          user_id,
          association_state
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'activo')
      `;

      const values = [
        production_code,
        production_name,
        production_location,
        production_start_date,
        production_end_date,
        production_description,
        crop_id,
        sensor_id,
        supplies_id,
        cycle_id,
        user_id
      ];

      console.log('Ejecutando query con valores:', values);
      const [result] = await db.query(query, values);
      console.log('Resultado de la inserción:', result);

      res.status(201).json({
        success: true,
        message: 'Producción registrada exitosamente',
        data: {
          id: result.insertId,
          production_code
        }
      });
    } catch (error) {
      console.error('Error detallado al crear producción:', error);
      console.error('Stack:', error.stack);
      res.status(500).json({
        success: false,
        message: 'Error al registrar la producción',
        error: error.message
      });
    }
  }
}

module.exports = new ProductionController(); 