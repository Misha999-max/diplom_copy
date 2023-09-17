const express = require("express");
const ProductParam = require("../models/ProductParam");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const productParams = await ProductParam.find();
    res.status(200).json({ list: productParams });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

module.exports = router;
