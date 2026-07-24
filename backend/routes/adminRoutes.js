const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getPendingSellers,
  approveSeller,
  rejectSeller,
  getDashboardStats,
  getAllCustomers,
  getAllProducts,
  getAllOrders,
  getAllSellers,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
 
router.get("/dashboard",getDashboardStats);

router.get("/customers", getAllCustomers);

router.get("/sellers", getAllSellers);

router.get("/pending-sellers", getPendingSellers);

router.put("/approve/:id", approveSeller);

router.put("/reject/:id", rejectSeller);

router.get("/products",getAllProducts);
router.get("/orders",getAllOrders);
module.exports = router;