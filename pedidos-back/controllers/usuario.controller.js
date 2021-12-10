const ctrlUsuario = {},
  Usuario = require("../models/usuarios");

ctrlUsuario.create = async (req, res) => {
  console.log("se ejecuta metodo create");
  const newUsuario = new Usuario({
    nombre_persona: req.body.nombre_persona,
    nombre_negocio: req.body.nombre_negocio,
    tipo_id: req.body.tipo_id, // CC, NIT sin digito de verif
    id_usuario: req.body.id_usuario,
    celular: req.body.celular,
  });

  await newUsuario.save();

  res.json({
    msg: "Product created successfully",
  });
};

ctrlUsuario.list = async (req, res) => {
  const usuarios = await Usuario.find();

  res.json(usuarios);
};

ctrlUsuario.update = async (req, res) => {
  const _id = req.params._id;
  const {
    nombre_persona,
    nombre_negocio,
    tipo_id, // CC, NIT sin digito de verif
    id_usuario,
    celular,
  } = req.body;
  await Usuario.findOneAndUpdate(
    { _id: _id },
    {
      nombre_persona: nombre_persona,
      nombre_negocio: nombre_negocio,
      tipo_id: tipo_id, // CC, NIT sin digito de verif
      id_usuario: id_usuario,
      celular: celular,
    }
  );
  res.json({ message: "Usuario actualizado satisfactoriamente" });
};

ctrlUsuario.usuarioById = async (req, res) => {
  const { _id } = req.params;
  const usuario = await Usuario.findOne({ _id: _id });
  res.json(usuario);
};

ctrlUsuario.delete = async (req, res) => {
  console.log(req.params._id);
  const { _id } = req.params;
  const users = await Usuario.deleteOne({ _id: _id });
  res.json({ message: "Usuario eliminado satisfactoriamente" });
};

module.exports = ctrlUsuario;
