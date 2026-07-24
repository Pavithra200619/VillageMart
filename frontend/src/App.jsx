import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";

import SellerLogin from "./pages/Seller/SellerLogin";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import AddProduct from "./pages/Seller/AddProduct";
import SellerSignup from "./pages/Seller/SellerSignup";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import CategoryProducts from "./pages/Category/CategoryProducts";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/Orders/OrderSuccess";
import Address from "./pages/Address/Address";
import MyOrders from "./pages/Orders/MyOrders";
import TrackOrder from "./pages/Orders/TrackOrder";
import SellerOrders from "./pages/Seller/SellerOrders";
import Subscription from "./pages/Subscription/Subscription";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminSellers from "./pages/Admin/AdminSellers";


function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Customer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />

      {/* Seller */}
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/add-product" element={<AddProduct />} />
      <Route path="/seller/signup" element={<SellerSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/category/:category" element={<CategoryProducts />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/address" element={<Address />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/admin/sellers" element={<AdminSellers />} />


    </Routes>
  );
}

export default App;