const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("../utils/jwt");

// Registrar una nueva empresa
async function postUser(req, res) {
  try {
    const { companyName, nit, email, password, contactName, phone, address } = req.body;

    // Validaciones básicas
    if (!companyName) return res.status(400).send({ msg: "El nombre de la empresa es obligatorio", status: false });
    if (!nit) return res.status(400).send({ msg: "El NIT es obligatorio", status: false });
    if (!email) return res.status(400).send({ msg: "El email es obligatorio", status: false });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria", status: false });
    if (!contactName) return res.status(400).send({ msg: "El nombre de contacto es obligatorio", status: false });

    // Crear nueva empresa
    const userModel = new User({
      companyName,
      nit,
      email: email.toLowerCase(),
      password,
      contactName,
      phone,
      address,
      role: 'admin',          // por defecto el primer registro es admin
      licenseStatus: 'pending' // licencia pendiente
    });

    // Hashear contraseña
    const salt = bcrypt.genSaltSync(10);
    userModel.password = bcrypt.hashSync(password, salt);

    const savedUser = await userModel.save();

    // No devolver password
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(200).send({ msg: userWithoutPassword, status: true });

  } catch (error) {
    console.error("Error en postUser:", error);
    return res.status(400).send({ msg: "Error al registrar empresa. Email/NIT puede estar repetido", status: false });
  }
}

// Login de empresa
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio", status: false });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria", status: false });

    const userStore = await User.findOne({ email: email.toLowerCase() });
    if (!userStore) return res.status(404).send({ msg: "Empresa no encontrada", status: false });

    const check = await bcrypt.compare(password, userStore.password);
    if (!check) return res.status(400).send({ msg: "Contraseña incorrecta", status: false });

    return res.status(200).send({
      msg: {
        access: jwt.createAccessToken(userStore),
        refresh: jwt.createRefreshToken(userStore)
      },
      status: true
    });

  } catch (error) {
    console.error("Error en signIn:", error);
    return res.status(503).send({ msg: "Error al ejecutar signIn: " + error.message, status: false });
  }
}

// Refrescar token de acceso
async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send({ msg: "Token requerido", status: false });

    const { user_id } = jwt.decoded(token);
    const user = await User.findById(user_id);
    if (!user) return res.status(404).send({ msg: "Empresa no encontrada", status: false });

    return res.status(200).send({ accessToken: jwt.createAccessToken(user) });
  } catch (error) {
    console.error("Error en refreshAccessToken:", error);
    return res.status(500).send({ msg: "Error al ejecutar refreshAccessToken", status: false });
  }
}

module.exports = {
  postUser,
  signIn,
  refreshAccessToken,
};
