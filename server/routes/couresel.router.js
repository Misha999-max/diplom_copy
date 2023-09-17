const express = require("express");
const router = express.Router({ mergeParams: true });
const Couresel = require("../models/Couresel");

router.get("/", async (req, res) => {
  try {
    const couresel = await Couresel.find();
    res.status(200).json({ list: couresel });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

module.exports = router;
