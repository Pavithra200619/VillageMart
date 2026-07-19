import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const discount = subtotal >= 500 ? 50 : 20;
  const total = subtotal - discount;

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1>🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <>
          <h2>Your cart is empty.</h2>

          <button
            onClick={() => navigate("/home")}
            style={{
              padding: "12px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SIDE */}
          <div style={{ flex: 2 }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "20px",
                  background: "white",
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2>{item.name}</h2>

                  <p>
                    <b>Seller:</b>{" "}
                    {item.shop_name || "VillageMart Seller"}
                  </p>

                  <h3>₹{item.price}</h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <h3>{item.quantity}</h3>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginTop: "15px",
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <h2>
                    ₹{Number(item.price) * item.quantity}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              flex: 1,
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
              position: "sticky",
              top: "20px",
            }}
          >
            <h2>Bill Summary</h2>

            <hr />

            <p>Subtotal : ₹{subtotal}</p>

            <p>Discount : -₹{discount}</p>

            <p>Delivery : FREE</p>

            <p>Platform Fee : FREE</p>

            <hr />

            <h2>Total : ₹{total}</h2>

            <div
              style={{
                background: "#e8f5e9",
                padding: "10px",
                borderRadius: "8px",
                margin: "15px 0",
              }}
            >
              🎉 You saved ₹{discount}
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "15px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;