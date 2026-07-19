import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const orderId =
    "VM" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: "550px",
          borderRadius: "15px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <div style={{ fontSize: "80px" }}>
          🎉
        </div>

        <h1 style={{ color: "green" }}>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping with
          <b> VillageMart ❤️</b>
        </p>

        <hr />

        <h3>
          Order ID
        </h3>

        <h2>{orderId}</h2>

        <hr />

        <h3>
          🚚 Estimated Delivery
        </h3>

        <h2>20 - 30 Minutes</h2>

        <hr />

        <button
          onClick={() => navigate("/my-orders")}
          style={{
            width: "100%",
            padding: "15px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Track Order
        </button>

        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%",
            padding: "15px",
            background: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;