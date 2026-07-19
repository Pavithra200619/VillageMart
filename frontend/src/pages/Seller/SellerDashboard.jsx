import { useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "../../components/Seller/SellerSidebar";

function SellerDashboard() {
  const seller = JSON.parse(localStorage.getItem("seller"));

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    lowStock: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const products = await axios.get(
        `http://localhost:5000/api/products/seller/${seller.id}`
      );

      const orders = await axios.get(
        `http://localhost:5000/api/orders/seller/${seller.id}`
      );

      const revenue = orders.data.reduce(
        (sum, order) => sum + Number(order.total_amount),
        0
      );

      const lowStock = products.data.filter(
        (product) => product.stock <= 5
      ).length;

      setStats({
        products: products.data.length,
        orders: orders.data.length,
        revenue,
        lowStock,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SellerSidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <h1>Welcome, {seller?.owner_name} 👋</h1>

        <p>{seller?.shop_name}</p>

        <br />

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Card title="📦 Products" value={stats.products} />
          <Card title="🛒 Orders" value={stats.orders} />
          <Card title="💰 Revenue" value={`₹${stats.revenue}`} />
          <Card title="⚠ Low Stock" value={stats.lowStock} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        width: "220px",
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,.1)",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default SellerDashboard;