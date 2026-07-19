import { useNavigate } from "react-router-dom";

import {
  FaCarrot,
  FaAppleAlt,
  FaGlassWhiskey,
  FaShoppingBasket,
  FaCookieBite,
  FaBreadSlice,
  FaHamburger,
  FaWineBottle,
} from "react-icons/fa";

function Categories() {
  const navigate = useNavigate();

  const categories = [
  { name: "Vegetables", icon: <FaCarrot size={38} color="#4CAF50" /> },
  { name: "Fruits", icon: <FaAppleAlt size={38} color="#E53935" /> },
  { name: "Milk", icon: <FaGlassWhiskey size={38} color="#64B5F6" /> },
  { name: "Groceries", icon: <FaShoppingBasket size={38} color="#FF9800" /> },
  { name: "Snacks", icon: <FaCookieBite size={38} color="#8D6E63" /> },
  { name: "Bakery", icon: <FaBreadSlice size={38} color="#D2691E" /> },
  { name: "Panipuri", icon: <FaHamburger size={38} color="#FFB300" /> },
  { name: "Beverages", icon: <FaWineBottle size={38} color="#7E57C2" /> },
];

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Shop by Category</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${item.name}`)}
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <>
  <div>{item.icon}</div>

  <h3 style={{ marginTop: "15px" }}>
    {item.name}
  </h3>
</>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;