require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Variables de entorno
const API_VERSION = process.env.API_VERSION || 'v1';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'; // Puedes poner tu dominio de front

// Importar rutas
const auth = require('./router/auth');
const user = require('./router/user');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Configuración de CORS
app.use(cors({
  origin: ALLOWED_ORIGIN,
  optionsSuccessStatus: 200
}));

// Rutas principales
app.use(`/api/${API_VERSION}`, auth);
app.use(`/api/${API_VERSION}`, user);

module.exports = app;
