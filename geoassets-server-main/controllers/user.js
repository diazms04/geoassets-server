const User = require("../models/user");

// Obtener datos de la empresa actual (según token JWT)
async function getMe(req, res) {
  try {
    const { user_id } = req.user;

    const company = await User.findById(user_id).select('-password'); // no enviar password

    if (!company) {
      return res.status(404).send({ msg: "No se ha encontrado la empresa", status: false });
    }

    return res.status(200).send({ msg: company, status: true });
  } catch (error) {
    console.error("Error en getMe:", error);
    return res.status(503).send({ msg: "Error al ejecutar getMe", status: false });
  }
}



module.exports = {
  getMe
};
