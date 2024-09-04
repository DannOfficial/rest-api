const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  apikey: { type: String, default: "" },
  limit: { type: Number, default: 100 },
  premium: { type: Boolean, default: false },
  vip: { type: Boolean, default: false },
  registered: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)