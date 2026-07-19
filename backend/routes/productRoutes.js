const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductsByCategory,
  getSellerProducts,
} = require("../controllers/productController");

router.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

router.get("/seller/:sellerId", getSellerProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/", getProducts);

router.post("/", addProduct);

module.exports = router;