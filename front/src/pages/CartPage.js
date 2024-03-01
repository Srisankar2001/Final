import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../services/Storage";
import { isAuthenticated, logout } from "../services/Auth";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
    const [user, setUser] = useState({ name: "", email: "", localId: "" });
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated()) {
                    const decoded = jwtDecode(getUserData());
                    setUser({ name: decoded.name, email: decoded.emailId, localId: decoded.iss });
                }
                if (user && user.localId !== null && user.localId !== "") {
                    const token = getUserData();
                    const responseCart = await axios.post("http://localhost:8080/cart", { userId: parseInt(user.localId) }, { headers: { 'authorization': token } });
                    setCart(responseCart.data.data);
                    console.log(responseCart.data);
                }
            } catch (error) {
                console.log("Error fetching cart:", error);
            }
        };
    
        fetchData();
    }, [user.localId]);
    

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

        if (cart.length > 0) {
            fetchItems();
        }
    }, [cart]);

    const logoutUser = () => {
        logout();
        navigate('/login')
    }

    const handleQuantityChange = async (id, productId, quantity) => {
        try {
            const newQuantity = parseInt(quantity);

            if (isNaN(newQuantity) || newQuantity <= 0) {
                console.log("Invalid quantity entered");
                return;
            }

            const token = getUserData();
            const data = { id: parseInt(id), userId: parseInt(user.localId), productId: parseInt(productId), quantity: newQuantity };
            await axios.put("http://localhost:8080/updateCart", data, { headers: { 'authorization': token } });

            setItems(prevItems => prevItems.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }));
        } catch (error) {
            console.log("Error updating quantity:", error);
        }
    };

    const handleDelete = async (id, productId) => {
        try {
            const token = getUserData();
            await axios.post("http://localhost:8080/deleteCart", { id: parseInt(id) }, { headers: { 'authorization': token } });
            setItems(prevItems => prevItems.filter(item => item.id !== productId));
        } catch (error) {
            console.log("Error deleting product:", error);
        }
    };

    return (
        <div className="container-fluid">
            <NavBar logoutUser={logoutUser} className="navbar navbar-expand-lg navbar-light bg-light"/>
            {items.length > 0 ?
                <div className="row">
                    <div className="container w-50 p-2" style={{ marginTop:"150px" ,padding:"40px"}}>
                        {items.map((item, index) => (
                            <div className="row" key={index} >
                                <div className="col-4 " style={{ padding:"40px"}}>
                                    <img src={`image/mobile/${item.location}`} alt={`Product ${item.id}`} className="my-2" />
                                </div>
                                <div className="col-8" style={{ padding:"40px"}}>
                                    <h1>{item.name}</h1>
                                    <form>
                                        <input type="number" name="quantity" placeholder={item.quantity} />
                                        <input type="button" value="Update" className="btn btn-primary mx-2" onClick={(e) => handleQuantityChange(item.cartId, item.id, e.target.previousElementSibling.value)} />
                                        <input type="button" value="Delete" className="btn btn-danger" onClick={(e) => handleDelete(item.cartId, item.id)} />
                                        <h3>Price: {item.price * item.quantity}</h3>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="container " style={{ marginTop:"200px" ,padding:"40px"}}>
                        <h1>Summary</h1>
                        {items.map((item, index) => (
                            <div key={index}>
                                <p>{item.name}<br />
                                    {item.quantity} X {item.price} LKR = {item.quantity * item.price} LKR
                                </p>
                            </div>
                        ))}
                        <h4>Total : {items.reduce((acc, item) => acc + (item.quantity * item.price), 0)} LKR </h4>
                        <Link to="/checkout">
                         <button className="btn btn-success">Check Out</button>
                        </Link>
                    </div>
                </div> :
                <h1> No items in the cart</h1>
            }
        </div>
    );
}

export default CartPage;
