const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    couresel: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Couresel", schema);
