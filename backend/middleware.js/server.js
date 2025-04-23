const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
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


app.listen(3000, () => {
  console.log ('Servidor corriendo en http://localhost:3000');
});


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
