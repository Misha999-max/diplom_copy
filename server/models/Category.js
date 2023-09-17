const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", schema);
