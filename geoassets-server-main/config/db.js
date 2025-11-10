require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔹 DEBUG: Variables de entorno MongoDB');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '*****' : undefined);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);

const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const DB_URI = 'mongodb://localhost:27017/geoasset';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('✅ MongoDB Atlas conectado correctamente');
  } catch (error) {
    console.error('🚀 ERROR: No se pudo conectar a MongoDB', error);
    process.exit(1); // Termina la app si no se conecta
  }
};

module.exports = connectDB;
