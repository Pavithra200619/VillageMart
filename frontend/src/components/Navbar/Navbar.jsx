import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar({
  search,
  setSearch,
  products = [],
}) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const suggestions = products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 6);

  return (
   <nav
  style={{
    display: "flex",
    flexDirection: window.innerWidth <= 768 ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: window.innerWidth <= 768 ? "12px" : "15px 40px",
    gap: "15px",
    background: "#1B5E20",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  }}
>
      {/* Logo */}
      <h2
        style={{ cursor: "pointer",
                 fontSize: "24px",
                 whiteSpace: "nowrap",
         }}
        onClick={() => navigate("/home")}
      >
        🌿 VillageMart
      </h2>

      {/* Search */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: window.innerWidth<=768 ? "100%" : "420px",
        }}
      >
        <input
          type="text"
          placeholder="Search milk, paneer, vegetables..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px 15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />


        {search !== "" && suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: 0,
              width: "100%",
              background: "white",
              borderRadius: "10px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,.2)",
              zIndex: 999,
            }}
          >
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  setSearch(product.name)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom:
                    "1px solid #eee",
                  color: "black",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <div>{product.name}</div>

                  <small>
                    ₹{product.price}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: window.innerWidth <= 768 ? "12px" : "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() =>
            navigate("/my-orders")
          }
          style={{
            padding:window.innerWidth <= 768 ? "6px 10px":"8px 15px",
            fontSize:window.innerWidth <= 768 ? "14px":"16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          My Orders
        </button>

        <div
          onClick={() => navigate("/cart")}
          style={{
            position: "relative",
            cursor: "pointer",
          }}
        >
          <FaShoppingCart size={24} />

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "red",
              borderRadius: "50%",
              padding: "2px 7px",
              fontSize: "12px",
            }}
          >
            {cartItems.length}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaUserCircle size={22} />
          <span
style={{
  maxWidth: "90px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}}
>
Hi, {user?.name || "Guest"}
</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
  padding: window.innerWidth <= 768 ? "6px 10px" : "8px 14px",
  fontSize: window.innerWidth <= 768 ? "14px" : "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
}}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;