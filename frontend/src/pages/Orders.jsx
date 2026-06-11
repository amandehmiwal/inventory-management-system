import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState("");

    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState("");

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        const response = await api.get("/customers");
        setCustomers(response.data);
    };

    const fetchProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data);
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

            setOrderItems([]);
            setSelectedCustomer("");

        } catch (error) {

            alert(error.response.data.detail);

        }

    };

    return (
        <div>

            <h1>Orders</h1>

            <h3>Select Customer</h3>

            <select value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}>
                <option>Select Customer</option>

                {customers.map((customer) => (
                    <option
                        key={customer.id}
                        value={customer.id}
                    >
                        {customer.full_name}
                    </option>
                ))}

            </select>

            <br />
            <br />

            <h3>Select Product</h3>

            <select value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}>
                <option>Select Product</option>

                {products.map((product) => (
                    <option
                        key={product.id}
                        value={product.id}
                    >
                        {product.name}
                    </option>
                ))}

            </select>

            <br />
            <br />

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button
                onClick={addItem}
                style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Add Item
            </button>

            <h3>Current Order</h3>

            <ul>

                {orderItems.map((item, index) => (

                    <li key={index}>
                        Product ID: {item.product_id}
                        {" "}
                        Quantity: {item.quantity}
                    </li>

                ))}

            </ul>

            <br />

            <button
                onClick={createOrder}
                style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Create Order
            </button>


        </div>
    );
}

export default Orders;