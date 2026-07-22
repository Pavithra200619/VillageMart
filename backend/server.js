const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
require("dotenv").config();
console.log("PORT =", process.env.PORT);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);

require("./config/db");   // Add this line

const app = express();

app.use(cors());
app.use(express.json());
console. log("Product routes registered");
app.use("/api/products", productRoutes);
console. log("product routes mounted");
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);
console.log("Orders route registered");
app.use("/api/payment", paymentRoutes);
app.use("/api/address", addressRoutes);

console.log("Address route registered");

app.get("/", (req, res) => {
    res.send("VillageMart Backend Running 12345");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});