require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Variables de entorno
const API_VERSION = process.env.API_VERSION || 'v1'; // Versión de la API

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Configuración de CORS
// Nota: Se ha eliminado ALLOWED_ORIGIN dinámico.
// Actualmente permite cualquier origen ('*') para desarrollo.
// En producción, reemplaza '*' por un array de dominios permitidos.
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

// Importar rutas
const auth = require('./router/auth');
const user = require('./router/user');

// Rutas principales
app.use(`/api/${API_VERSION}`, auth);
app.use(`/api/${API_VERSION}`, user);

module.exports = app;
