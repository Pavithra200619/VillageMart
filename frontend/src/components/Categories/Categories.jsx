import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    "Vegetables",
    "Fruits",
    "Milk",
    "Groceries",
    "Snacks",
    "Bakery",
    "Panipuri",
    "Beverages",
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
            onClick={() => navigate(`/category/${item}`)}
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;