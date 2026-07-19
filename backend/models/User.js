const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: ""
    },
    latitude: {
      type: Number,
      default: 0
    },
    longitude: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);