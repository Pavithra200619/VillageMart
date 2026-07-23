const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getCustomerOrders,
  getSellerOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getAllOrdersForAdmin,
} = require("../controllers/orderController");

router.post("/", placeOrder);

router.get("/customer/:customerId", getCustomerOrders);

router.get("/seller/:sellerId", getSellerOrders);

router.get("/admin/all", getAllOrdersForAdmin);

router.get("/admin", getAllOrders);

router.put("/:orderId", updateOrderStatus);

router.get("/:id", getOrderById);

module.exports = router;