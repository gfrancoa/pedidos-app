const { Router } = require("express"),
  router = Router();

router.use("/product", require("./producto.route"));
router.use("/user", require("./usuario.route"));
router.use("/order", require("./pedido.route"));

module.exports = router;
