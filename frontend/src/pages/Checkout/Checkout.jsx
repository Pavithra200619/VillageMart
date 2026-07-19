import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("online");

  const address = JSON.parse(localStorage.getItem("deliveryAddress"));
  const user = JSON.parse(localStorage.getItem("user"));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const discount = subtotal >= 500 ? 50 : 20;
  const total = subtotal - discount;
  const handleOnlinePayment = async () => {
  try {
    const { data } = await axios.post(
      "https://villagemart-tu66.onrender.com/api/payment/create-order",
      {
        amount: total,
      }
    );

    const options = {
      key: "rzp_test_TFEMSwpsNBLaQz",
      amount: data.amount,
      currency: data.currency,
      name: "VillageMart",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
  try {
    alert("Payment Successful!");

    const orderData = {
      customer_id: user.id,
      seller_id: cartItems[0].seller_id,
      total_amount: total,
      payment_method: "Online",
      payment_id: response.razorpay_payment_id,

      address: address
        ? `${address.name}, ${address.house}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`
        : "Home, Bangalore",

      items: cartItems.map((item) => ({
        product_id: item.id,
        seller_id: item.seller_id,
        product_name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };

    console.log(orderData);

    await axios.post(
      "https://villagemart-tu66.onrender.com/api/orders",
      orderData
    );

    clearCart();

    alert("Order Placed Successfully!");

    navigate("/order-success");

  } catch (error) {
    console.error(error);
    alert("Failed to save order after payment");
  }
},

      
      prefill: {
       name: address?.name || "",
       contact: address?.phone || "",
},

      theme: {
        color: "#22c55e",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error(error);
    alert("Unable to create payment.");
  }
};

  const placeOrder = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }
      if (paymentMethod === "online") {
    return handleOnlinePayment();
}

      const orderData = {
        customer_id: user.id,
        seller_id: cartItems[0].seller_id,
        total_amount: total,
        payment_method: "Cash on Delivery",
        address: address
          ? `${address.name}, ${address.house}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`
          : "Home, Bangalore",
        items: cartItems.map((item) => ({
          product_id: item.id,
          seller_id:item.seller_id,
          product_name:item.name,
          quantity: item.quantity,
          price:Number(item.price),
        })),
      };

      console.log(orderData);

      await axios.post(
        "https://villagemart-tu66.onrender.com/api/orders",
        orderData
      );

      clearCart();


      alert("Order Placed Successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
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
      <h1>Checkout</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 2 }}>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>📍 Delivery Address</h2>

            {address ? (
              <>
                <h3>{address.name}</h3>

                <p>
                  {address.house}, {address.area}
                </p>

                <p>
                  {address.city}, {address.state}
                </p>

                <p>{address.pincode}</p>

                <p>{address.phone}</p>
              </>
            ) : (
              <>
                <h3>Home</h3>
                <p>Bangalore, Karnataka</p>
              </>
            )}

            <button
              onClick={() => navigate("/address")}
              style={{
                marginTop: "15px",
                padding: "10px 18px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Change Address
            </button>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>🎁 Available Offers</h2>

            <p>✅ WELCOME50 - ₹50 OFF on orders above ₹500</p>
            <p>✅ FRESH10 - 10% OFF on Vegetables</p>
            <p>✅ FREE DELIVERY</p>
            <p>✅ VillageMart Festival Offer</p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>💳 Payment Method</h2>

<label>
  <input
    type="radio"
    name="payment"
    value="online"
    checked={paymentMethod === "online"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Online Payment
</label>

<br />

<label>
  <input
    type="radio"
    name="payment"
    value="cod"
    checked={paymentMethod === "cod"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Cash on Delivery
</label>

          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            position: "sticky",
            top: "20px",
          }}
        >
          <h2>Order Summary</h2>

          <hr />

          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px" }}>
              <b>{item.name}</b>

              <p>
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <hr />

          <p>Subtotal : ₹{subtotal}</p>
          <p>Discount : -₹{discount}</p>
          <p>Delivery : FREE</p>
          <p>Platform Fee : FREE</p>

          <hr />

          <h2>Total : ₹{total}</h2>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;

  

      
  

