const express = require("express"),
  router = express.Router(),
  productoCtrl = require("../controllers/producto.controller");

router.post("/", productoCtrl.create);
router.get("/", productoCtrl.list);
router.put("/:_id", productoCtrl.update);
router.delete("/:_id", productoCtrl.delete);
router.get("/:_id", productoCtrl.productoById);

module.exports = router;
