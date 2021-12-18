const mongoose = require("mongoose");

var PedidoSchema = new mongoose.Schema({
  items: [
    {
      tipo_pan: String,
      tipo_masa: String,
      longitud_gramos: String,
      topping: String,
      cantidad: Number,
      precio_unitario: Number,
      subtotal: Number,
      foto: String,
    },
  ],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
  observaciones: { type: String },
  fecha_creacion: { type: Date, default: new Date() },
  fecha_entrega: { type: String },
  total: { type: Number },
  status: { type: String, default: "creado" },
});

module.exports = mongoose.model("pedido", PedidoSchema);
