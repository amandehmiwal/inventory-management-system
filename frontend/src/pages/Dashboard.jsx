import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1
        style={{
          marginBottom: "10px",
          color: "#1e293b"
        }}
      >
        Inventory Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "25px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "260px"
          }}
        >
          <p style={{ color: "#64748b", margin: 0 }}>
            📦 Total Products
          </p>

          <h1 style={{ marginTop: "10px" }}>
            {dashboard.total_products}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "260px"
          }}
        >
          <p style={{ color: "#64748b", margin: 0 }}>
            👥 Total Customers
          </p>

          <h1 style={{ marginTop: "10px" }}>
            {dashboard.total_customers}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "260px"
          }}
        >
          <p style={{ color: "#64748b", margin: 0 }}>
            🛒 Total Orders
          </p>

          <h1 style={{ marginTop: "10px" }}>
            {dashboard.total_orders}
          </h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <h2>⚠️ Low Stock Products</h2>

        {dashboard.low_stock_products.length === 0 ? (
          <p>No low stock products.</p>
        ) : (
          dashboard.low_stock_products.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <span>{product.name}</span>

              <span>
                Qty: {product.quantity}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;