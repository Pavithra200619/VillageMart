import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SellerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://villagemart-tu66.onrender.com/api/seller/login",
        formData
      );

      localStorage.setItem(
        "seller",
        JSON.stringify(response.data.seller)
      );

      localStorage.setItem(
        "sellerToken",
        response.data.token
      );

      alert("Seller Login Successful");

      navigate("/seller/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Invalid Email or Password"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          🏪 Seller Login
        </h2>

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        <br />
        <br />

        <p style={{ textAlign: "center" }}>
          New Seller?{" "}
          <Link to="/seller/signup">
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SellerLogin;