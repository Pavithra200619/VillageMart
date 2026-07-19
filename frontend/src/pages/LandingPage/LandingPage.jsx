import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (user && token) {
    navigate("/home");
  }
}, [navigate]);

  return (
    <div className="landing-container">
      <div className="landing-card">

        <h1>🌿 Welcome to VillageMart</h1>

        <p>
          Fresh Groceries • Fast Delivery • Trusted Sellers
        </p>

        <div className="portal-container">

          {/* Customer */}

          <div
            className="portal-card"
            onClick={() => navigate("/login")}
          >
            <h2>🛒</h2>
            <h3>Customer</h3>
          </div>

          {/* Seller */}

          <div
            className="portal-card"
            onClick={() => navigate("/seller/login")}
          >
            <h2>🏪</h2>
            <h3>Seller</h3>
          </div>

          {/* Admin */}

          <div
            className="portal-card"
            onClick={() => navigate("/admin/login")}
          >
            <h2>👨‍💼</h2>
            <h3>Admin</h3>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LandingPage;