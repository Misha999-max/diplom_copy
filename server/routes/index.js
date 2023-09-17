const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.router"));
router.use("/category", require("./category.router"));
router.use("/couresel", require("./couresel.router"));
router.use("/user", require("./user.router"));
router.use("/product", require("./product.router"));
router.use("/productParam", require("./productParam.router"));

module.exports = router;
