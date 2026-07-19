const pool = require("../config/db");

// ==============================
// Place Order
// ==============================
exports.placeOrder = async (req, res) => {
  try {
    const {
      customer_id,
      total_amount,
      payment_method,
      address,
      items,
    } = req.body;

    const firstSellerId = items[0].seller_id;

    const order = await pool.query(
      `INSERT INTO orders
      (customer_id, seller_id, total_amount, payment_method, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        customer_id,
        firstSellerId,
        total_amount,
        payment_method,
        address,
      ]
    );

    const orderId = order.rows[0].id;

    for (const item of items) {

  await pool.query(
    `INSERT INTO order_items
    (
      order_id,
      product_id,
      seller_id,
      product_name,
      quantity,
      price,
      subtotal
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)`,

    [
      orderId,
      item.product_id,
      item.seller_id,
      item.product_name,
      item.quantity,
     Number(item.price),
      item.quantity * Number(item.price),
    ]
  );

}

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order: order.rows[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Customer Orders
// ==============================
exports.getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM orders
       WHERE customer_id=$1
       ORDER BY created_at DESC`,
      [customerId]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Seller Orders
// ==============================
exports.getSellerOrders = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM orders
       WHERE seller_id=$1
       ORDER BY created_at DESC`,
      [sellerId]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Admin Orders
// ==============================
exports.getAllOrders = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT *
       FROM orders
       ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Update Order Status
// ==============================
exports.updateOrderStatus = async (req, res) => {
  try {

    const { orderId } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET status=$1
       WHERE id=$2
       RETURNING *`,
      [status, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order Status Updated",
      order: result.rows[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};