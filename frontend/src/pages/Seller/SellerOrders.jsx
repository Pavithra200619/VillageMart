import { useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "../../components/Seller/SellerSidebar";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const seller = JSON.parse(localStorage.getItem("seller"));
      console. log("Seller Object:",seller);

      if (!seller) return;

      const res = await axios.get(
        `https://villagemart-tu66.onrender.com/api/orders/seller/${seller.id}`
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `https://villagemart-tu66.onrender.com/api/orders/${orderId}`,
        {
          status,
        }
      );

      alert("Order status updated successfully");

      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <SellerSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>
          📦 Seller Orders
        </h1>

        {orders.length === 0 ? (
          <h2>No Orders Available</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "20px",
                boxShadow: "0 3px 10px rgba(0,0,0,.1)",
              }}
            >
              <h2>Order #{order.id}</h2>

              <hr />

              <p>
                <strong>Customer ID:</strong> {order.customer_id}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {order.total_amount}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.payment_method}
              </p>

              <p>
                <strong>Delivery Address:</strong>{" "}
                {order.address}
              </p>

              <p>
                <strong>Status:</strong>{" "}
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

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(order.id, "Accepted")
                  }
                  style={buttonStyle}
                >
                  ✅ Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(order.id, "Packed")
                  }
                  style={buttonStyle}
                >
                  📦 Packed
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order.id,
                      "Out for Delivery"
                    )
                  }
                  style={buttonStyle}
                >
                  🚚 Ship
                </button>

                <button
                  onClick={() =>
                    updateStatus(order.id, "Delivered")
                  }
                  style={{
                    ...buttonStyle,
                    background: "#2e7d32",
                  }}
                >
                  ✔ Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#1976d2",
  color: "white",
  fontWeight: "bold",
};

export default SellerOrders;