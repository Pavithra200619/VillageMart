import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TrackOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedOrder =
    location.state?.order ||
    JSON.parse(localStorage.getItem("selectedOrder"));

  const [order, setOrder] = useState(selectedOrder);

  useEffect(() => {
  if (!selectedOrder) return;

  fetchOrder();

  const interval = setInterval(() => {
    fetchOrder();
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/${selectedOrder.id}`
      );

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>No Order Found</h2>

        <button onClick={() => navigate("/my-orders")}>
          Back
        </button>
      </div>
    );
  }

  const steps = [
    "Pending",
    "Accepted",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];

  const currentIndex = steps.indexOf(order.status);

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <button
        onClick={() => navigate("/my-orders")}
        style={{
          padding: "10px 18px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1>🚚 Track Order</h1>

        <hr />

        <h3>Order ID</h3>
        <p>{order.id}</p>

        <h3>Total Amount</h3>
        <p>₹{order.total_amount}</p>

        <h3>Payment</h3>
        <p>{order.payment_method}</p>

        <h3>Delivery Address</h3>
        <p>{order.address}</p>

        <hr />

        <h2>Order Progress</h2>

        <div style={{ marginTop: "30px" }}>
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background:
                    index <= currentIndex ? "green" : "#d9d9d9",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </div>

              <div style={{ marginLeft: "20px" }}>
                <h3>{step}</h3>

                <p>
                  {index <= currentIndex
                    ? "Completed"
                    : "Waiting..."}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#e8f5e9",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          Current Status :
          <b style={{ color: "green" }}> {order.status}</b>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;