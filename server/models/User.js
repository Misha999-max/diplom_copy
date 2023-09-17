const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    user_id: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    login: { type: String },
    isAdmin: { type: Boolean },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
