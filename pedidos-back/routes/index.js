const { Router } = require("express"),
  router = Router();

router.use("/product", require("./producto.route"));

module.exports = router;
