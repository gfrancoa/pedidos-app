const mongoose = require("mongoose");

var UsuarioSchema = new mongoose.Schema({
  nombre_persona: { type: String },
  nombre_negocio: { type: String },
  tipo_id: { type: String }, // CC, NIT sin digito de verif
  id_usuario: { type: String },
  celular: { type: String },
});

module.exports = mongoose.model("usuario", UsuarioSchema);
