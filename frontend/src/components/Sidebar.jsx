import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>Inventory System</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>

        <Link to="/customers" style={{ color: "white", textDecoration: "none" }}>
          Customers
        </Link>

        <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
          Orders
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;