const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =======================
// Admin Login
// =======================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const admin = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Admin Login Successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =======================
// Get Pending Sellers
// =======================
exports.getPendingSellers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sellers WHERE status = 'Pending' ORDER BY created_at DESC"
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =======================
// Approve Seller
// =======================
exports.approveSeller = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE sellers SET status = 'Approved' WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Seller Approved Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =======================
// Reject Seller
// =======================
exports.rejectSeller = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE sellers SET status = 'Rejected' WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Seller Rejected Successfully",
    });

  } catch (error) {
    console.error("Customer API Error:",error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// =======================
// Dashboard Statistics
// =======================
exports.getDashboardStats = async (req, res) => {
  try {
    const customers = await pool.query("SELECT COUNT(*) FROM users");

    const sellers = await pool.query(
      "SELECT COUNT(*) FROM sellers WHERE status='Approved'"
    );

    const products = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const orders = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const revenue = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) AS revenue
       FROM orders
       WHERE order_status='Accepted'`
    );

    res.status(200).json({
      totalCustomers: Number(customers.rows[0].count),
      totalSellers: Number(sellers.rows[0].count),
      totalProducts: Number(products.rows[0].count),
      totalOrders: Number(orders.rows[0].count),
      totalRevenue: Number(revenue.rows[0].revenue),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// =======================
// Get All Customers
// =======================
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id,name,email
       FROM users
       ORDER BY id DESC`
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// =======================
// Get All Products
// =======================
exports.getAllProducts = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        p.category,
        s.shop_name
      FROM products p
      LEFT JOIN sellers s
      ON p.seller_id = s.id
      ORDER BY p.id DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// =======================
// Get All Orders
// =======================
exports.getAllOrders = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT *
      FROM orders
      ORDER BY id DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};