const mysql = require('mysql');
require('dotenv').config();

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexion.connect(function(error) {
  if (error) {
    console.error('Error en la conexión:', error.stack);
    return;
  }
  console.log('Conexión exitosa');
});

module.exports = conexion;
