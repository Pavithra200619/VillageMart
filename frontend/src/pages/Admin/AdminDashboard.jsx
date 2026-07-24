import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [pendingSellers, setPendingSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "https://villagemart-tu66.onrender.com/api/admin/dashboard"
      );
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPendingSellers = async () => {
    try {
      const res = await axios.get(
        "https://villagemart-tu66.onrender.com/api/admin/pending-sellers"
      );
      setPendingSellers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "https://villagemart-tu66.onrender.com/api/admin/customers"
      );
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchPendingSellers();
    fetchCustomers();
  }, []);

  const approveSeller = async (id) => {
    try {
      await axios.put(
        `https://villagemart-tu66.onrender.com/api/admin/approve/${id}`
      );

      alert("Seller Approved Successfully");
      fetchDashboard();
      fetchPendingSellers();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectSeller = async (id) => {
    try {
      await axios.put(
        `https://villagemart-tu66.onrender.com/api/admin/reject/${id}`
      );

      alert("Seller Rejected Successfully");
      fetchDashboard();
      fetchPendingSellers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>VillageMart</h2>

        <ul>
          <li>📊 Dashboard</li>
          <li>👥 Customers</li>
          <li onClick={() => (window.location.href = "/admin/sellers")}>
  🏪 Sellers
</li>
          <li>📦 Products</li>
          <li onClick={() => (window.location.href = "/admin/orders")}>
            🛒 Orders
          </li>
          <li>💳 Payments</li>
          <li>📈 Analytics</li>
          <li>⚙ Settings</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Admin Dashboard</h1>

        <div className="cards">
          <div className="card">
            <h3>Customers</h3>
            <h2>{stats.totalCustomers}</h2>
          </div>

          <div className="card">
            <h3>Sellers</h3>
            <h2>{stats.totalSellers}</h2>
          </div>

          <div className="card">
            <h3>Products</h3>
            <h2>{stats.totalProducts}</h2>
          </div>

          <div className="card">
            <h3>Orders</h3>
            <h2>{stats.totalOrders}</h2>
          </div>

          <div className="card revenue">
            <h3>Revenue</h3>
            <h2>₹ {stats.totalRevenue}</h2>
          </div>
        </div>

        <h2>Pending Sellers</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shop</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingSellers.length === 0 ? (
              <tr>
                <td colSpan="6">No Pending Sellers</td>
              </tr>
            ) : (
              pendingSellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.id}</td>
                  <td>{seller.shop_name}</td>
                  <td>{seller.owner_name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone}</td>
                  <td>
                    <button
                      className="approve"
                      onClick={() => approveSeller(seller.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() => rejectSeller(seller.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2 style={{ marginTop: "40px" }}>Customers</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="3">No Customers Found</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;