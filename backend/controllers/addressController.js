const pool = require("../config/db");

// Add Address
exports.addAddress = async (req, res) => {
  try {
    const {
      customer_id,
      full_name,
      phone,
      house_no,
      street,
      landmark,
      city,
      state,
      pincode,
      address_type,
      is_default,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO addresses
      (customer_id,full_name,phone,house_no,street,landmark,city,state,pincode,address_type,is_default)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        customer_id,
        full_name,
        phone,
        house_no,
        street,
        landmark,
        city,
        state,
        pincode,
        address_type,
        is_default,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Addresses
exports.getAddresses = async (req, res) => {
  try {

    const { customerId } = req.params;

    const result = await pool.query(
      "SELECT * FROM addresses WHERE customer_id=$1 ORDER BY is_default DESC,id DESC",
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