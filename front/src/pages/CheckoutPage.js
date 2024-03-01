import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../services/Storage";
import { isAuthenticated, logout } from "../services/Auth";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage() {
    const [user, setUser] = useState({ name: "", email: "", localId: "", address: "" });
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated()) {
                    const decoded = jwtDecode(getUserData());
                    setUser({ name: decoded.name, email: decoded.emailId, localId: decoded.iss });
                }
            } catch (error) {
                console.log("Error decoding user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (user && user.localId) {
                    const token = getUserData();
                    const response = await axios.post("http://localhost:8080/cart", { userId: parseInt(user.localId) }, { headers: { 'authorization': token } });
                    setCart(response.data.data);
                }
            } catch (error) {
                console.log("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [user]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = getUserData();
                const itemRequests = cart.map(async (item) => {
                    const response = await axios.get(`http://localhost:8080/product/${item.productId}`, { headers: { 'authorization': token } });
                    return { ...response.data.data, cartId: item.id, quantity: item.quantity };
                });
                const items = await Promise.all(itemRequests);
                setItems(items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, [cart]);

    const logoutUser = () => {
        logout();
        navigate('/login');
    }

    const generateOrderSummary = (user, items) => {
        let message = `Hey, ${user.name} here is your order summary.\n`;
        message += `You ordered ${items.length} items.\nOrder Summary:\n`;
        let total = 0;
        items.forEach(item => {
            const subtotal = item.quantity * item.price;
            message += `${item.name} : ${item.quantity} x ${item.price} LKR = ${subtotal} LKR\n`;
            total += subtotal;
        });
        message += `Your total is ${total} LKR.\nThank you for the purchase.`;
        return message;
    };

    const sendEmail = async (orderId, userId, message) => {
        try {
            const token = getUserData();
            const response = await axios.post("http://localhost:8080/sendMail", { orderId, userId, message }, { headers: { 'authorization': token } });
            console.log("Email sent successfully:", response);
        } catch (error) {
            console.log("Error sending email:", error);
        }
    };

    const handleAddressInput = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckout = async () => {
        if (!user.address) {
            alert("Address field is empty.");
            return;
        }
        try {
            const token = getUserData();
            const response = await axios.post("http://localhost:8080/createOrder", { userId: parseInt(user.localId), address: user.address }, { headers: { 'authorization': token } });
            const orderId = response.data.data.id;

            const orderItems = items.map(item => ({
                orderId: parseInt(orderId),
                productId: parseInt(item.id),
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price)
            }));

            const itemDeleteRequests = items.map(item => axios.post("http://localhost:8080/deleteCart", { id: parseInt(item.cartId) }, { headers: { 'authorization': token } }));
            await Promise.all(itemDeleteRequests);

            const orderItemRequests = orderItems.map(item => axios.post("http://localhost:8080/orderItem", item, { headers: { 'authorization': token } }));
            await Promise.all(orderItemRequests);

            const message = generateOrderSummary(user, items);
            await sendEmail(orderId, user.localId, message);

            console.log("Checkout successful");
            navigate("/products");
        } catch (error) {
            console.log("Error during checkout:", error);
        }
    };

    return (
        <div className="container-fluid">
            <NavBar logoutUser={logoutUser} className="navbar navbar-expand-lg navbar-light bg-light" />
            <div className="container" style={{ marginTop: "200px", padding: "40px" }}>
                <h1>Summary</h1>
                {items.map((item, index) => (
                    <div key={index}>
                        <p>{item.name}<br />
                            {item.quantity} X {item.price}.00 LKR = {item.quantity * item.price}.00 LKR
                        </p>
                    </div>
                ))}
                <h4>Total : {items.reduce((acc, item) => acc + (item.quantity * item.price), 0)}.00 LKR </h4>
                <input type="text" className="form-control my-2" name="address" placeholder="Enter your address" value={user.address} onChange={handleAddressInput} />
                <button className="btn btn-success" onClick={handleCheckout}>Place Order</button>
                <Link to="/cart">
                    <button className="btn btn-danger mx-2">Cancel</button>
                </Link>
            </div>
        </div>
    );
}

export default CheckoutPage;
