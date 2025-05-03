const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

let ExcelJS, PDFDocument;
try {
    ExcelJS = require('exceljs');
    PDFDocument = require('pdfkit');
} catch (error) {
    console.warn('Export modules not found. Export functionality will be limited.');
    console.warn('Please run: npm install exceljs pdfkit');
}

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'lembo'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.log('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para agregar un usuario
app.post('/users', (req, res) => {
  const{user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, confirmation_email } = req.body;

  db.query (
    'INSERT INTO users (user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, confirmation_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

    [user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, confirmation_email],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Usuario agregado' });
    }
  );
});
// Ruta para obtener los usuarios
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users ORDER BY user_name DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(result);
  });
});

// Ruta para agregar un cultivo
app.post('/crop', (req, res) => {
  const{crop_id, crop_type, crop_location, crop_size, crop_name, crop_state, crop_image, crop_description } = req.body;

  db.query (
    'INSERT INTO crop (crop_type, crop_location, crop_size, crop_name, crop_state, crop_image, crop_description) VALUES (?, ?, ?, ?, ?, ?, ?)',

    [crop_type, crop_location, crop_size, crop_name, crop_state, crop_image, crop_description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Cultivo agregado' });
    }
  );
});

// Ruta para exportar cultivos
app.get('/crop/export', async (req, res) => {
    const { format } = req.query;
    
    try {
        const [rows] = await db.promise().query('SELECT * FROM crop');

        if (format === 'excel') {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Cultivos');

            // Configurar columnas
            worksheet.columns = [
                { header: 'ID', key: 'crop_id', width: 10 },
                { header: 'Nombre', key: 'crop_name', width: 20 },
                { header: 'Tipo', key: 'crop_type', width: 15 },
                { header: 'Ubicación', key: 'crop_location', width: 20 },
                { header: 'Tamaño', key: 'crop_size', width: 15 },
                { header: 'Estado', key: 'crop_state', width: 15 },
                { header: 'Descripción', key: 'crop_description', width: 40 }
            ];

            // Estilo para encabezados
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };

            rows.forEach(row => worksheet.addRow(row));

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=cultivos.xlsx');
            await workbook.xlsx.write(res);
            res.end();

        } else if (format === 'pdf') {
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=cultivos.pdf');
            
            doc.pipe(res);
            doc.fontSize(16).text('Reporte de Cultivos', { align: 'center' });
            doc.moveDown();

            rows.forEach(row => {
                doc.fontSize(12).text(`ID: ${row.crop_id}`);
                doc.text(`Nombre: ${row.crop_name}`);
                doc.text(`Tipo: ${row.crop_type}`);
                doc.text(`Ubicación: ${row.crop_location}`);
                doc.text(`Tamaño: ${row.crop_size}`);
                doc.text(`Estado: ${row.crop_state}`);
                doc.text(`Descripción: ${row.crop_description}`);
                doc.moveDown();
            });

            doc.end();
        }
    } catch (error) {
        console.error('Error en exportación:', error);
        res.status(500).json({ error: 'Error al exportar datos' });
    }
});

// Ruta para obtener los cultivos
app.get('/crop', (req, res) => {
  const query = 'SELECT * FROM crop ORDER BY crop_name DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los cultivos');
      return;
    }
    res.json(result);
  });
});

// Ruta para obtener detalles de un cultivo específico
app.get('/crop/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM crop WHERE crop_id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error al obtener los detalles del cultivo' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cultivo no encontrado' });
        }
        res.json(result[0]);
    });
});

// Ruta para cambiar estado de cultivo
app.put('/crop/:id/state', (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    
    if (!id || !state) {
        return res.status(400).json({ error: 'ID y estado son requeridos' });
    }

    const query = 'UPDATE crop SET crop_state = ? WHERE crop_id = ?';
    
    db.query(query, [state, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).json({ error: 'Error al actualizar el estado' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cultivo no encontrado' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    });
});

// Ruta para agregar un ciclo de cultivo
app.post('/cycle', (req, res) => {
  const{cycle_location, cycle_name, cycle_status, cycle_news, cycle_start_date, cycle_end_date, cycle_description} = req.body;

  db.query (
    'INSERT INTO cycle (cycle_location, cycle_name, cycle_status, cycle_news, cycle_start_date, cycle_end_date, cycle_description) VALUES (?, ?, ?, ?, ?, ?, ?)',

    [cycle_location, cycle_name, cycle_status, cycle_news, cycle_start_date, cycle_end_date, cycle_description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Ciclo agregado' });
    }
  );
});
// Ruta para obtener los ciclos
app.get('/cycle', (req, res) => {
  const query = 'SELECT * FROM cycle ORDER BY cycle_name DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los ciclos');
      return;
    }
    res.json(result);
  });
});


// Ruta para agregar un insumo
app.post('/supplies', (req, res) => {
  const{supplies_id, crop_cycle_id, crop_id, supplies_type, supplies_cuantity, supplies_name, supplies_state, supplies_unit_value, supplies_total_value, supplies_measure, supplies_description} = req.body;

  db.query (
    'INSERT INTO supplies (supplies_id, crop_cycle_id, crop_id, supplies_type, supplies_cuantity, supplies_name, supplies_state, supplies_unit_value, supplies_total_value, supplies_measure, supplies_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

    [supplies_id, crop_cycle_id, crop_id, supplies_type, supplies_cuantity, supplies_name, supplies_state, supplies_unit_value, supplies_total_value, supplies_measure, supplies_description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Insumo agregado' });
    }
  );
});
// Ruta para obtener los insumos
app.get('/supplies', (req, res) => {
  const query = 'SELECT * FROM supplies ORDER BY supplies_name DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los insumos');
      return;
    }
    res.json(result);
  });
});

// Ruta para agregar un sensor
app.post('/sensor', (req, res) => {
  const{sensor_id, sensor_measure, sensor_type, sensor_scan_time, sensor_name, sensor_status, sensor_image, sensor_description} = req.body;

  db.query (
    'INSERT INTO sensor (sensor_id, sensor_measure, sensor_type, sensor_scan_time, sensor_name, sensor_status, sensor_image, sensor_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

    [sensor_id, sensor_measure, sensor_type, sensor_scan_time, sensor_name, sensor_status, sensor_image, sensor_description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Sensor agregado' });
    }
  );
});
// Ruta para obtener los sensores
app.get('/sensor', (req, res) => {
  const query = 'SELECT * FROM sensor ORDER BY sensor_name DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los sensores');
      return;
    }
    res.json(result);
  });
});

// Ruta para obtener detalles de un sensor específico
app.get('/sensor/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM sensor WHERE sensor_id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error al obtener los detalles del sensor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Sensor no encontrado' });
        }
        res.json(result[0]);
    });
});

// Ruta para cambiar estado de sensor
app.put('/sensor/:id/state', (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    
    if (!id || !state) {
        return res.status(400).json({ error: 'ID y estado son requeridos' });
    }

    const query = 'UPDATE sensor SET sensor_status = ? WHERE sensor_id = ?';
    
    db.query(query, [state, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).json({ error: 'Error al actualizar el estado' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sensor no encontrado' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    });
});

// Rutas para asociaciones
app.get('/associations', (req, res) => {
  const query = `
    SELECT 
      a.association_id,
      c.crop_name,
      s.sensor_name,
      sup.supplies_name,
      cy.cycle_name,
      CONCAT(u.user_name, ' ', u.user_last_name) as user_full_name,
      a.association_state
    FROM association a
    JOIN crop c ON a.crop_id = c.crop_id
    JOIN sensor s ON a.sensor_id = s.sensor_id
    JOIN supplies sup ON a.supplies_id = sup.supplies_id
    JOIN cycle cy ON a.cycle_id = cy.cycle_id
    JOIN users u ON a.user_id = u.id_user
    ORDER BY a.association_id DESC
  `;
  
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error al obtener las asociaciones');
      return;
    }
    res.json(result);
  });
});

// Ruta para cambiar estado de asociación
app.put('/associations/:id/state', (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    
    if (!id || !state) {
        return res.status(400).json({ error: 'ID y estado son requeridos' });
    }

    const query = 'UPDATE association SET association_state = ? WHERE association_id = ?';
    
    db.query(query, [state, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).json({ error: 'Error al actualizar el estado' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asociación no encontrada' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    });
});

// Ruta para exportar asociaciones
app.get('/associations/export', async (req, res) => {
    const { format } = req.query;
    
    const query = `
        SELECT 
            c.crop_name as 'Cultivo',
            s.sensor_name as 'Sensor',
            sup.supplies_name as 'Insumo',
            cy.cycle_name as 'Ciclo',
            CONCAT(u.user_name, ' ', u.user_last_name) as 'Usuario',
            a.association_state as 'Estado'
        FROM association a
        JOIN crop c ON a.crop_id = c.crop_id
        JOIN sensor s ON a.sensor_id = s.sensor_id
        JOIN supplies sup ON a.supplies_id = sup.supplies_id
        JOIN cycle cy ON a.cycle_id = cy.cycle_id
        JOIN users u ON a.user_id = u.id_user
    `;

    try {
        const [rows] = await db.promise().query(query);

        if (format === 'excel') {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Asociaciones');

            // Configurar columnas
            worksheet.columns = [
                { header: 'Cultivo', key: 'Cultivo', width: 20 },
                { header: 'Sensor', key: 'Sensor', width: 20 },
                { header: 'Insumo', key: 'Insumo', width: 20 },
                { header: 'Ciclo', key: 'Ciclo', width: 20 },
                { header: 'Usuario', key: 'Usuario', width: 25 },
                { header: 'Estado', key: 'Estado', width: 15 }
            ];

            // Estilo para encabezados
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };

            // Agregar datos
            rows.forEach(row => {
                worksheet.addRow(row);
            });

            // Configurar respuesta
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=asociaciones.xlsx');

            // Escribir al response
            await workbook.xlsx.write(res);
            res.end();
        } else if (format === 'pdf') {
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=asociaciones.pdf');
            
            doc.pipe(res);
            doc.fontSize(16).text('Reporte de Asociaciones', { align: 'center' });
            doc.moveDown();

            rows.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    doc.fontSize(12).text(`${key}: ${value}`);
                });
                doc.moveDown();
            });

            doc.end();
        }
    } catch (error) {
        console.error('Error en exportación:', error);
        res.status(500).json({ error: 'Error al exportar datos' });
    }
});

// Ruta para crear nueva asociación
app.post('/associations', (req, res) => {
  const { crop_id, sensor_id, supplies_id, cycle_id, user_id } = req.body;
  
  const query = `
    INSERT INTO association 
    (crop_id, sensor_id, supplies_id, cycle_id, user_id, association_state) 
    VALUES (?, ?, ?, ?, ?, 'activo')
  `;
  
  db.query(query, [crop_id, sensor_id, supplies_id, cycle_id, user_id], (err, result) => {
    if (err) {
      console.error('Error al crear asociación:', err);
      res.status(500).json({ error: 'Error al crear la asociación' });
      return;
    }
    res.status(201).json({ 
      message: 'Asociación creada correctamente',
      id: result.insertId 
    });
  });
});

// Agregar nueva ruta para obtener detalles de una asociación
app.get('/associations/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            a.*,
            c.crop_name, c.crop_state, c.crop_type,
            s.sensor_name, s.sensor_type,
            sup.supplies_name, sup.supplies_state,
            cy.cycle_name, cy.cycle_status,
            CONCAT(u.user_name, ' ', u.user_last_name) as user_full_name,
            u.user_type
        FROM association a
        JOIN crop c ON a.crop_id = c.crop_id
        JOIN sensor s ON a.sensor_id = s.sensor_id
        JOIN supplies sup ON a.supplies_id = sup.supplies_id
        JOIN cycle cy ON a.cycle_id = cy.cycle_id
        JOIN users u ON a.user_id = u.id_user
        WHERE a.association_id = ?
    `;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error al obtener los detalles' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Asociación no encontrada' });
        }
        res.json(result[0]);
    });
});

app.listen(3000, () => {
  console.log ('Servidor corriendo en http://localhost:3000');
});
