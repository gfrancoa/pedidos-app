const mongoose = require("mongoose");

var ProductoSchema = new mongoose.Schema({
  titulo: { type: String },
  foto: { type: String },
  descripcion: { type: String },
  tipo_masa: { type: String },
  gramos: { type: Number },
  longitud: { type: Number },
  tipo_pan: { type: String },
  valor_unitario: { type: Number },
  status: { type: Boolean, default: true },
  topping: { type: String },
});

module.exports = mongoose.model("producto", ProductoSchema);
