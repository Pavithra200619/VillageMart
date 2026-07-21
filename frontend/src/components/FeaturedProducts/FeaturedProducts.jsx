import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { useCart } from "../../context/CartContext";

function FeaturedProducts({ search = "" }) {
  const [products, setProducts] = useState([]);

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
  style={{
    padding: window.innerWidth <= 768 ? "15px" : "40px",
  }}
>
      <h2>Featured Products</h2>

      {filteredProducts.length === 0 ? (
        <h3 style={{ marginTop: "20px" }}>No products found</h3>
      ) : (
        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      window.innerWidth <= 768
        ? "repeat(2,1fr)"
        : "repeat(4,1fr)",
    gap: window.innerWidth <= 768 ? "12px" : "20px",
    marginTop: "20px",
  }}
>
          {filteredProducts.map((product) => {
            const cartItem = cartItems.find(
              (item) => String(item.id) === String(product.id)
            );

            return (
              <div
                key={product.id}
                style={{
                  background: "white",
                  padding: window.innerWidth <= 768 ? "12px" : "20px",
                  borderRadius: "18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                  transition: "0.3s",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: window.innerWidth <= 768 ? "150px" : "220px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <h2>₹{product.price}</h2>

                {!cartItem ? (
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "#1B5E20",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    + ADD
                  </button>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#2e7d32",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "white",
                        fontSize: "22px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(product.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "white",
                        fontSize: "22px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;