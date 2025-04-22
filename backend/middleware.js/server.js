const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuario por defecto en XAMPP
  password: '', // Si no tienes contraseña
  database: 'sistema_agricola'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.log('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Middleware para procesar JSON
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos

// Ruta para agregar un usuario
app.post('/agregar_usuario', (req, res) => {
  const { nombre, correo, telefono, fecha_nacimiento } = req.body;

  const query = 'INSERT INTO usuarios (nombre, correo, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, correo, telefono, fecha_nacimiento], (err, result) => {
    if (err) {
      res.status(500).send('Error al insertar datos');
      return;
    }
    res.status(200).send('Usuario agregado');
  });
});

// Ruta para obtener los usuarios
app.get('/usuarios', (req, res) => {
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
});
