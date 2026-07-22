const pool = require("../config/db");

// Create Subscription
const createSubscription = async (req, res) => {
  try {
    const {
      user_id,
      product_name,
      quantity,
      frequency,
      delivery_time,
      start_date,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO subscriptions
      (user_id, product_name, quantity, frequency, delivery_time, start_date, status)
      VALUES ($1,$2,$3,$4,$5,$6,'Active')
      RETURNING *`,
      [
        user_id,
        product_name,
        quantity,
        frequency,
        delivery_time,
        start_date,
      ]
    );

    res.status(201).json({
      message: "Subscription created successfully.",
      subscription: result.rows[0],
    });
  } catch (err) {
    console.error("Create Subscription Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Pause Subscription
const pauseSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE subscriptions SET status='Paused' WHERE id=$1",
      [id]
    );

    res.json({ message: "Subscription paused." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Resume Subscription
const resumeSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE subscriptions SET status='Active' WHERE id=$1",
      [id]
    );

    res.json({ message: "Subscription resumed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Cancel Subscription
const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE subscriptions SET status='Cancelled' WHERE id=$1",
      [id]
    );

    res.json({ message: "Subscription cancelled." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
};