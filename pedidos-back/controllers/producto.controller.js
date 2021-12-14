const ctrlProducto = {},
  Producto = require("../models/productos");

ctrlProducto.create = async (req, res) => {
  // console.log("se ejecuta metodo create");
  const newProducto = new Producto({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    tipo_masa: req.body.tipo_masa,
    gramos: req.body.gramos,
    longitud: req.body.longitud,
    tipo_pan: req.body.tipo_pan,
    valor_unitario: req.body.valor_unitario,
    status: req.body.status,
    foto: req.body.foto,
    topping: req.body.topping,
  });

  await newProducto.save();

  res.json({
    msg: "Product created successfully",
  });
};

ctrlProducto.list = async (req, res) => {
  const productos = await Producto.find();

  res.json(productos);
};

ctrlProducto.update = async (req, res) => {
  const _id = req.params._id;
  const {
    titulo,
    descripcion,
    tipo_masa,
    gramos,
    longitud,
    tipo_pan,
    valor_unitario,
    status,
    foto,
    topping,
  } = req.body;
  await Producto.findOneAndUpdate(
    { _id: _id },
    {
      titulo: titulo,
      descripcion: descripcion,
      tipo_masa: tipo_masa,
      gramos: gramos,
      longitud: longitud,
      tipo_pan: tipo_pan,
      valor_unitario: valor_unitario,
      status: status,
      foto: foto,
      topping: topping,
    }
  );
  res.json({ message: "Producto actualizado satisfactoriamente" });
};

ctrlProducto.productoById = async (req, res) => {
  const { _id } = req.params;
  const producto = await Producto.findOne({ _id: _id });
  res.json(producto);
};

ctrlProducto.delete = async (req, res) => {
  // console.log(req.params._id);
  const { _id } = req.params;
  const users = await Producto.deleteOne({ _id: _id });
  res.json({ status: true });
};

module.exports = ctrlProducto;
