const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getCustomerOrders,
  getSellerOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/orderController");

router.post("/", placeOrder);

router.get("/customer/:customerId", getCustomerOrders);

router.get("/seller/:sellerId", getSellerOrders);

router.get("/:id", getOrderById);

router.get("/admin", getAllOrders);

router.put("/:orderId", updateOrderStatus);

module.exports = router;