import { Link } from "react-router-dom";

function SellerSidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#2e7d32",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
      }}
    >
      <h2>🛒 VillageMart</h2>
      <p>Seller Panel</p>

      <hr style={{ margin: "20px 0", borderColor: "#ffffff55" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "20px",
        }}
      >
        <Link
          to="/seller/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/seller/add-product"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          ➕ Add Product
        </Link>

        <Link
          to="/seller/products"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          📦 My Products
        </Link>

        <Link
          to="/seller/orders"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          🛍 Orders
        </Link>

        <Link
          to="/seller/analytics"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          📈 Analytics
        </Link>

        <Link
          to="/seller/profile"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          👤 Profile
        </Link>

        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("seller");
          }}
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
            marginTop: "30px",
          }}
        >
          🚪 Logout
        </Link>
      </div>
    </div>
  );
}

export default SellerSidebar;