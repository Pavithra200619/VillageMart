import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = () => {
    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(address)
    );

    alert("Address Saved Successfully");
    navigate("/checkout");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
      }}
    >
      <h2>Add Delivery Address</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="house"
        placeholder="House No / Flat"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="area"
        placeholder="Area"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="state"
        placeholder="State"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
      />
      <br /><br />

      <button
        onClick={saveAddress}
        style={{
          width: "100%",
          padding: "12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Save Address
      </button>
    </div>
  );
}

export default Address;