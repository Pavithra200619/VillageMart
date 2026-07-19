const pool = require("../config/db");

// =======================
// Add Product
// =======================
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      seller_id,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products
      (name, description, price, category, image, stock, seller_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        name,
        description,
        price,
        category,
        image,
        stock,
        seller_id,
      ]
    );

    res.status(201).json({
      message: "Product Added Successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================
// Get All Products
// =======================
exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.*,
        s.shop_name
      FROM products p
      LEFT JOIN sellers s
      ON p.seller_id = s.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================
// Get Products By Category
// =======================
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const result = await pool.query(
      `
      SELECT
        p.*,
        s.shop_name
      FROM products p
      LEFT JOIN sellers s
      ON p.seller_id = s.id
      WHERE LOWER(p.category) = LOWER($1)
      ORDER BY p.id DESC
      `,
      [category]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM products
      WHERE seller_id = $1
      ORDER BY id DESC
      `,
      [sellerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};