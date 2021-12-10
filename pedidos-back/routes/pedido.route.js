const express = require("express"),
  router = express.Router(),
  pedidoCtrl = require("../controllers/pedido.controller");

router.post("/", pedidoCtrl.create);
router.get("/", pedidoCtrl.list);
router.put("/:_id", pedidoCtrl.update);
router.delete("/:_id", pedidoCtrl.delete);
router.get("/:_id", pedidoCtrl.pedidoById);
router.get("/byidpop/:_id", pedidoCtrl.pedidoByIdPop);
router.get("/byuser/:_id", pedidoCtrl.pedidoByIdUser);

module.exports = router;
