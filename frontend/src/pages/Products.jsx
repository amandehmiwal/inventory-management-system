import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createProduct = async () => {
    try {
      await api.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });

      fetchProducts();

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: ""
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.detail ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
          color: "#1e293b"
        }}
      >
        Products
      </h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px"
        }}
      >
        <h2>Add Product</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}
        >
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <button
            onClick={createProduct}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <thead>
          <tr
            style={{
              background: "#1e293b",
              color: "white"
            }}
          >
            <th style={{ padding: "15px" }}>Name</th>
            <th style={{ padding: "15px" }}>SKU</th>
            <th style={{ padding: "15px" }}>Price</th>
            <th style={{ padding: "15px" }}>Quantity</th>
            <th style={{ padding: "15px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={{
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <td style={{ padding: "15px" }}>
                {product.name}
              </td>

              <td style={{ padding: "15px" }}>
                {product.sku}
              </td>

              <td style={{ padding: "15px" }}>
                ₹{product.price}
              </td>

              <td style={{ padding: "15px" }}>
                {product.quantity}
              </td>

              <td style={{ padding: "15px" }}>
                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;