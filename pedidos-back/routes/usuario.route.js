const express = require("express"),
  router = express.Router(),
  usuarioCtrl = require("../controllers/usuario.controller");

router.post("/", usuarioCtrl.create);
router.get("/", usuarioCtrl.list);
router.put("/:_id", usuarioCtrl.update);
router.delete("/:_id", usuarioCtrl.delete);
router.get("/:id_usuario", usuarioCtrl.usuarioById);

module.exports = router;
