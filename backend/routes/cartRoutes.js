const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.put("/update", updateQuantity);

router.delete("/remove/:cartItemId", removeFromCart);

module.exports = router;