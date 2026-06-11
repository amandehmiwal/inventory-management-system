import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await api.get("/customers");
    setCustomers(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createCustomer = async () => {
    try {
      await api.post("/customers", {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone
      });

      fetchCustomers();

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Something went wrong"
      );
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
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
        Customers
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
        <h2>Add Customer</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}
        >
          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db"
            }}
          />

          <button
            onClick={createCustomer}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Add Customer
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
            <th style={{ padding: "15px" }}>Email</th>
            <th style={{ padding: "15px" }}>Phone</th>
            <th style={{ padding: "15px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              style={{
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <td style={{ padding: "15px" }}>
                {customer.full_name}
              </td>

              <td style={{ padding: "15px" }}>
                {customer.email}
              </td>

              <td style={{ padding: "15px" }}>
                {customer.phone}
              </td>

              <td style={{ padding: "15px" }}>
                <button
                  onClick={() => deleteCustomer(customer.id)}
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

export default Customers;