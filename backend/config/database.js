const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'lembo'
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
