import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "10px",
    background:
      location.pathname === path
        ? "#2563eb"
        : "#1e293b",
    transition: "0.3s"
  });

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "25px",
        boxSizing: "border-box"
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "40px",
          borderBottom: "1px solid #334155",
          paddingBottom: "15px"
        }}
      >
        📦 Inventory System
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <Link
          to="/"
          style={linkStyle("/")}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/products"
          style={linkStyle("/products")}
        >
          📦 Products
        </Link>

        <Link
          to="/customers"
          style={linkStyle("/customers")}
        >
          👥 Customers
        </Link>

        <Link
          to="/orders"
          style={linkStyle("/orders")}
        >
          🛒 Orders
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;