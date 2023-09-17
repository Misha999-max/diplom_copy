const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    category_id: { type: String },
    like: { type: Boolean },
    description: { type: String },
    price: { type: String },
    title: { type: String },
    image: { type: String },
    parametr: { type: Schema.Types.ObjectId, ref: "ProductParam" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
