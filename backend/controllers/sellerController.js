const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===============================
// Seller Signup
// ===============================
exports.sellerSignup = async (req, res) => {
  try {
    const {
      shop_name,
      owner_name,
      email,
      phone,
      address,
      password,
    } = req.body;

    // Check if seller already exists
    const existingSeller = await pool.query(
      "SELECT * FROM sellers WHERE email = $1",
      [email]
    );

    if (existingSeller.rows.length > 0) {
      return res.status(400).json({
        message: "Seller already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save seller with Pending status
    await pool.query(
      `INSERT INTO sellers
      (shop_name, owner_name, email, phone, address, password, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        shop_name,
        owner_name,
        email,
        phone,
        address,
        hashedPassword,
        "Pending",
      ]
    );

    res.status(201).json({
      message:
        "Registration submitted successfully. Waiting for admin approval.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Seller Login
// ===============================
exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM sellers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    const seller = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(
      password,
      seller.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Check seller approval
    if (seller.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is waiting for admin approval.",
      });
    }

    if (seller.status === "Rejected") {
      return res.status(403).json({
        message:
          "Your registration has been rejected.",
      });
    }

    if (seller.status === "Suspended") {
      return res.status(403).json({
        message:
          "Your account has been suspended.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: seller.id,
        email: seller.email,
        role: "seller",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Seller Login Successful",
      token,
      seller: {
        id: seller.id,
        shop_name: seller.shop_name,
        owner_name: seller.owner_name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        status: seller.status,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};