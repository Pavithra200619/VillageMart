const pool = require("../config/db");

// Add Product to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if user already has a cart
    let cart = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [userId]
    );

    let cartId;

    if (cart.rows.length === 0) {
      const newCart = await pool.query(
        "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
        [userId]
      );

      cartId = newCart.rows[0].id;
    } else {
      cartId = cart.rows[0].id;
    }

    // Check if product already exists in cart
    const existingItem = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartId, productId]
    );

    if (existingItem.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE id = $1",
        [existingItem.rows[0].id]
      );

      return res.json({
        message: "Quantity Updated",
      });
    }

    await pool.query(
      "INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1,$2,$3)",
      [cartId, productId, 1]
    );

    res.json({
      message: "Product Added to Cart",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await pool.query(
      "SELECT * FROM carts WHERE user_id=$1",
      [userId]
    );

    if (cart.rows.length === 0) {
      return res.json([]);
    }

    const cartId = cart.rows[0].id;

    const items = await pool.query(
      `SELECT
        cart_items.id,
        products.name,
        products.price,
        products.image,
        cart_items.quantity
      FROM cart_items
      JOIN products
      ON cart_items.product_id = products.id
      WHERE cart_items.cart_id = $1`,
      [cartId]
    );

    res.json(items.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    await pool.query(
      "UPDATE cart_items SET quantity=$1 WHERE id=$2",
      [quantity, cartItemId]
    );

    res.json({
      message: "Quantity Updated",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Remove Product
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await pool.query(
      "DELETE FROM cart_items WHERE id=$1",
      [cartItemId]
    );

    res.json({
      message: "Removed Successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};