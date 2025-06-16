const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String }, // Ensure this field exists if you're using it
},


 {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);