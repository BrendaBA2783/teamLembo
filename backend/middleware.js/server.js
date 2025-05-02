const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de conexión a la base de datos
async function main() { 
  const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', 
      database: 'lembo'
  });

  // Conectar a la base de datos
  console.log('Conectado a la base de datos');
  

  // Ruta para obtener el nuevo ID automático
  app.get('/nuevo-id', async (req, res) => {
    try {
      const [filas] = await db.query('SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1');
      const ultimo = filas[0]?.user_id || 'USER-0000';
      const nuevoId = generarNuevoId(ultimo);

      console.log("Nuevo ID generado:", nuevoId);
      res.json({ id_generado: nuevoId });
    } catch (error) {
      console.error('Error al generar ID:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  });
  // Ruta para agregar un usuario
  app.post('/users', (req, res) => {
    const{user_id, user_type, user_document_type, user_name, user_last_name, user_document_number, user_phone, user_email } = req.body;

    console.log("Datos recibidos para el nuevo usuario:", req.body);
    
    db.query (
      'INSERT INTO users (user_id, user_type, user_document_type, user_name, user_last_name, user_document_number, user_phone, user_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

      [user_id, user_type, user_document_type, user_name, user_last_name, user_document_number, user_phone, user_email],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al insertar datos' });
          return;
        }
        res.status(200).json({ message: 'Usuario registrado' });
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

  app.listen(3000, () => {
    console.log ('Servidor corriendo en http://localhost:3000');
  });
}

// Generar nuevo ID de usuario
function generarNuevoId(user_id) {
  const num = parseInt(user_id.split('-')[1]) + 1;
  return `USER-${num.toString().padStart(4, '0')}`;
}

main();


// Ruta para agregar asociacion
/* app.post('/asociacion', (req, res) => {
  const{asociacion_id, crop_id, cycle_id, sensor_id, supplies_id, users_id} = req.body;

  db.query (
    'INSERT INTO asociacion (asociacion_id, crop_id, cycle_id, sensor_id, supplies_id, users_id) VALUES (?, ?, ?, ?, ?, ?)',

    [asociacion_id, crop_id, cycle_id, sensor_id, supplies_id, users_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al insertar datos' });
        return;
      }
      res.status(200).json({ message: 'Asociacion agregada' });
    }
  );
}); */
// Ruta para obtener los usuarios
/* app.get('/users', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id_usuario DESC';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); */
