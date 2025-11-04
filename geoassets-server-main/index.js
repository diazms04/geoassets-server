require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;
const IP_SERVER = process.env.IP_SERVER || 'localhost';
const API_VERSION = process.env.API_VERSION || 'v1';

// Conectar la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`
*********************************************************************
*********************************************************************
********                                                      *******
********    SERVER RUNNING IN: http://${IP_SERVER}:${PORT}/api/${API_VERSION}    ******
********                                                      *******
*********************************************************************
*********************************************************************
`);
});
