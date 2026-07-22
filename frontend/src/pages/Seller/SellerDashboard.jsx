import { useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "../../components/Seller/SellerSidebar";

function SellerDashboard() {
  const seller = JSON.parse(localStorage.getItem("seller"));

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    todayOrders: 0,
    todayRevenue: 0,
    lowStock: 0,
  });
  const [orders, setOrders] = useState([]);

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
      setOrders(orders.data);
    // Get unique orders
const uniqueOrders = [
  ...new Map(orders.data.map(order => [order.id, order])).values(),
];

// Calculate revenue only once per order
const revenue = uniqueOrders.reduce(
  (sum, order) => sum + Number(order.total_amount),
  0
);

const lowStock = products.data.filter(
  (product) => product.stock <= 5
).length;
const today = new Date().toISOString().split("T")[0];

const todayOrders = uniqueOrders.filter(order =>
  order.created_at.startsWith(today)
);

const todayRevenue = todayOrders.reduce(
  (sum, order) => sum + Number(order.total_amount),
  0
);

  setStats({
  products: products.data.length,
  orders: uniqueOrders.length,
  revenue,
  todayOrders: todayOrders.length,
  todayRevenue,
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
         <Card title="📅 Today's Orders" value={stats.todayOrders} />
         <Card title="💵 Today's Revenue" value={`₹${stats.todayRevenue}`} />
         <Card title="⚠ Low Stock" value={stats.lowStock} />
        </div>
        <h2 style={{ marginTop: "40px" }}>Customer Orders</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    marginTop: "20px",
  }}
>
  <thead>
    <tr>
      <th>Name</th>
      <th>email</th>
      <th>Product</th>
      <th>Qty</th>
      <th>Total</th>
      <th>Payment</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {orders.slice(0,10).map((order) => (
      <tr key={`${order.id}-${order.product_name}`}>
        <td>{order.customer_name}</td>
        <td>{order.customer_email}</td>
        <td>{order.product_name}</td>
        <td>{order.quantity}</td>
        <td>₹{order.subtotal}</td>
        <td>{order.payment_method}</td>
        <td>{order.order_status}</td>
      </tr>
    ))}
  </tbody>
</table>
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