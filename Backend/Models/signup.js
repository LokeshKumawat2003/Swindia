const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "User" },
  status: { type: String, required: true, default: "Active" },
});
const UserModel = mongoose.model("Users", RegisterSchema);
module.exports = UserModel;
