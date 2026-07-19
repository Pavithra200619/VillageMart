import { useState } from "react";
import axios from "axios";
import SellerSidebar from "../../components/Seller/SellerSidebar";

function AddProduct() {
  const seller = JSON.parse(localStorage.getItem("seller"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://villagemart-tu66.onrender.com/api/products", {
        ...formData,
        seller_id: seller.id
      });

      alert("Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: ""
      });

    } catch (err) {
      console.log(err);
      alert("Failed to Add Product");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SellerSidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <br /><br />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <br /><br />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <br /><br />

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <br /><br />

          <button type="submit">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;