const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    product_id: { type: String },
    size: { type: String },
    CPU: { type: String },
    memory: { type: String },
    ОС: { type: String },
    battery: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ProductParam", schema);
