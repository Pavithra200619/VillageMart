import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `https://villagemart-tu66.onrender.com/api/orders/customer/${user.id}`
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Order #{order.id}</h2>

            <hr />

            <p>
              <b>Total:</b> ₹{order.total_amount}
            </p>

            <p>
              <b>Payment:</b> {order.payment_method}
            </p>

            <p>
              <b>Address:</b> {order.address}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "Pending"
                      ? "orange"
                      : "blue",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <p>
              <b>Ordered On:</b>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => {
                  localStorage.setItem(
                    "selectedOrder",
                    JSON.stringify(order)
                  );
                  navigate("/track-order");
                }}
                style={{
                  background: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🚚 Track Order
              </button>

              <button
                onClick={() => navigate("/home")}
                style={{
                  background: "#ff9800",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🛒 Buy Again
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;