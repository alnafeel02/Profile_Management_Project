const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    avatar: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
