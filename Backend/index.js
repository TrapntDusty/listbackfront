const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const Router = require('./Route/IndexRoute');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Conexión a la base de datos
const sequelize = new Sequelize('nombre_bd', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

// Importar modelos
const Task = require('./Model/IndexModel')(sequelize, Sequelize);

// Definir rutas
app.use('/Routes', Router(Task));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});