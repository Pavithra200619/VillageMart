const express = require("express");
const router = express.Router();

const {
  sellerSignup,
  sellerLogin,
} = require("../controllers/sellerController");

router.post("/signup", sellerSignup);
router.post("/login", sellerLogin);

module.exports = router;