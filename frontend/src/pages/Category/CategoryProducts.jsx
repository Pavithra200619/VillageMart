import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/products/category/${category}`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "30px",
      }}
    >
      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "10px 18px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Home
      </button>

      <h2 style={{ marginBottom: "25px" }}>{category}</h2>

      {loading ? (
        <h3>Loading products...</h3>
      ) : products.length === 0 ? (
        <h3>No products available in this category.</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{product.name}</h3>

              <p>
                <strong>Seller:</strong> {product.shop_name}
              </p>

              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <button
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart!`);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;