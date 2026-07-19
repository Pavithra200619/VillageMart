import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SellerSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shop_name: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://villagemart-tu66.onrender.com/api/seller/signup",
        {
          shop_name: formData.shop_name,
          owner_name: formData.owner_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        }
      );

      alert(response.data.message);

      navigate("/seller/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          width: "450px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          🏪 Seller Registration
        </h2>

        <br />

        <input
          type="text"
          name="shop_name"
          placeholder="Shop Name"
          value={formData.shop_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="owner_name"
          placeholder="Owner Name"
          value={formData.owner_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Shop Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Register Shop
        </button>

        <br /><br />

        <p style={{ textAlign: "center" }}>
          Already Registered?{" "}
          <Link to="/seller/login">
            Seller Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SellerSignup;