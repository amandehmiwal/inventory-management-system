import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f1f5f9"
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            overflowY: "auto"
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto"
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;