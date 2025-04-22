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
  const{user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, user_confirmation_email } = req.body;

  db.query (
    'INSERT INTO users (user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, user_confirmation_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

    [user_type, user_document_type, user_name, user_last_name, user_identification_number, user_phone, user_email, user_confirmation_email],
    (err, result) => {
      if (err) {
        result.status(500).send('Error al insertar datos');
        return;
      }
        result.status(200).send('Usuario agregado');
    }
  );
});

app.listen(3000, () => {
  console.log ('Servidor corriendo en http://localhost:3000/user');
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
