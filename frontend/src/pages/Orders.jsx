import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState("");

    const [orderItems, setOrderItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchCustomers = async () => {
        const response = await api.get("/customers");
        setCustomers(response.data);
    };

    const fetchProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data);
    };

    const fetchOrders = async () => {
        const response = await api.get("/orders");
        setOrders(response.data);
    };

    const viewOrderDetails = async (orderId) => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            setSelectedOrder(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addItem = () => {
        if (!selectedProduct || !quantity) {
            return;
        }

        setOrderItems([
            ...orderItems,
            {
                product_id: Number(selectedProduct),
                quantity: Number(quantity)
            }
        ]);

        setSelectedProduct("");
        setQuantity("");
    };

    const createOrder = async () => {
        try {
            await api.post("/orders", {
                customer_id: Number(selectedCustomer),
                items: orderItems
            });

            alert("Order Created Successfully");

            fetchOrders();

            setOrderItems([]);
            setSelectedCustomer("");

        } catch (error) {
            alert(
                error.response?.data?.detail ||
                "Something went wrong"
            );
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
                Orders
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
                <h2>Create Order</h2>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                    }}
                >
                    <select
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db"
                        }}
                    >
                        <option value="">
                            Select Customer
                        </option>

                        {customers.map((customer) => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.full_name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db"
                        }}
                    >
                        <option value="">
                            Select Product
                        </option>

                        {products.map((product) => (
                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db"
                        }}
                    />

                    <button
                        onClick={addItem}
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Add Item
                    </button>
                </div>
            </div>

            <div
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginBottom: "30px"
                }}
            >
                <h2>Current Order</h2>

                {orderItems.length === 0 ? (
                    <p>No items added yet.</p>
                ) : (
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    background: "#1e293b",
                                    color: "white"
                                }}
                            >
                                <th style={{ padding: "12px" }}>
                                    Product ID
                                </th>
                                <th style={{ padding: "12px" }}>
                                    Quantity
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ padding: "12px" }}>
                                        {item.product_id}
                                    </td>

                                    <td style={{ padding: "12px" }}>
                                        {item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <button
                onClick={createOrder}
                style={{
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                Create Order
            </button>

            <div
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginTop: "30px"
                }}
            >
                <h2>Order History</h2>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                background: "#1e293b",
                                color: "white"
                            }}
                        >
                            <th style={{ padding: "12px" }}>Order ID</th>
                            <th style={{ padding: "12px" }}>Customer ID</th>
                            <th style={{ padding: "12px" }}>Total Amount</th>
                            <th style={{ padding: "12px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td style={{ padding: "12px" }}>
                                    {order.id}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {order.customer_id}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    ₹{order.total_amount}
                                </td>
                                <td style={{ padding: "12px" }}>
                                    <button
                                        onClick={() => viewOrderDetails(order.id)}
                                        style={{
                                            background: "#2563eb",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedOrder && (
                    <div
                        style={{
                            marginTop: "30px",
                            padding: "20px",
                            background: "#f8fafc",
                            borderRadius: "12px"
                        }}
                    >
                        <h3>Order Details</h3>

                        <p>
                            <strong>Order ID:</strong> {selectedOrder.id}
                        </p>

                        <p>
                            <strong>Customer ID:</strong> {selectedOrder.customer_id}
                        </p>

                        <p>
                            <strong>Total Amount:</strong> ₹{selectedOrder.total_amount}
                        </p>

                        <h4>Items</h4>

                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    Product ID: {item.product_id}
                                    {" | "}
                                    Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;