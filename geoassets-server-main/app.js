require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Variables de entorno
const API_VERSION = process.env.API_VERSION || 'v1'; // Versión de la API

// Middlewares globales
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Configuración de CORS
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

// -----------------------------
// Importar middleware de API key
// -----------------------------
const apiKeyAuth = require('./middlewares/apiKeyAuth');

// -----------------------------
// Importar routers
// -----------------------------
const auth = require('./router/auth');
const user = require('./router/user');

// -----------------------------
// Aplicar middleware de API key a TODAS las rutas de la API
// -----------------------------
app.use(`/api/${API_VERSION}`, apiKeyAuth);

// -----------------------------
// Rutas principales
// -----------------------------
app.use(`/api/${API_VERSION}`, auth);
app.use(`/api/${API_VERSION}`, user);

// -----------------------------
// Endpoint de health check (no protegido)
// -----------------------------
app.get('/health', (req, res) => {
  res.sendStatus(200); // Devuelve HTTP 200 OK
});

module.exports = app;
