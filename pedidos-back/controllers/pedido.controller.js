const ctrlPedido = {},
  Pedido = require("../models/pedidos");

ctrlPedido.create = async (req, res) => {
  // console.log("se ejecuta metodo create");
  const newPedido = new Pedido({
    items: req.body.items,
    usuario: req.body.usuario,
    observaciones: req.body.observaciones,
    fecha_entrega: req.body.fecha_entrega,
    total: req.body.total,
  });

  await newPedido.save();

  res.json({
    message: "Pedido creado exitosamente",
    status: 201,
    id: newPedido._id,
  });
};

ctrlPedido.list = async (req, res) => {
  const pedidos = await Pedido.find().populate("usuario");

  res.json(pedidos);
};

ctrlPedido.update = async (req, res) => {
  const _id = req.params._id;
  const { items, usuario, observaciones, fecha_entrega, total, status } =
    req.body;
  await Pedido.findOneAndUpdate(
    { _id: _id },
    {
      items: items,
      usuario: usuario,
      observaciones: observaciones,
      fecha_entrega: fecha_entrega,
      total: total,
      status: status,
    }
  );
  res.json({ message: "Pedido actualizado satisfactoriamente", status: 200 });
};

ctrlPedido.pedidoById = async (req, res) => {
  const { _id } = req.params;
  const pedido = await Pedido.findOne({ _id: _id });
  res.json(pedido);
};

ctrlPedido.pedidoByIdPop = async (req, res) => {
  const { _id } = req.params;
  const pedido = await Pedido.find({ _id: _id }).populate("usuario"); //el nombre la propiedad en la tabla
  res.json(pedido);
};

ctrlPedido.pedidoByIdUser = async (req, res) => {
  const { _id } = req.params;
  const pedido = await Pedido.find({ usuario: _id }).populate("usuario"); //el nombre la propiedad en la tabla
  res.json(pedido);
};

ctrlPedido.delete = async (req, res) => {
  // console.log(req.params._id);
  const { _id } = req.params;
  const users = await Pedido.deleteOne({ _id: _id });
  res.json({ message: "Pedido eliminado satisfactoriamente" });
};

module.exports = ctrlPedido;
