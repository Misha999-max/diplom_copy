const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    console.log(res);
    const product = await Product.find();
    res.status(200).json({ list: product });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    console.log(productId);
    const product = await Product.findById(productId);
    res.status(200).json({ list: product });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

module.exports = router;
