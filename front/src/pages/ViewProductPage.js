import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../services/Storage";
import { isAuthenticated, logout } from "../services/Auth";
import { addToCart } from "../services/Api";
import { jwtDecode } from "jwt-decode";

function ViewProductPage() {
    const { mobileId } = useParams();
    const [mobile, setMobile] = useState({});
    const [user, setUser] = useState({ name: "", email: "", localId: "" })

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated()) {
            let decoded = jwtDecode(getUserData());
            setUser({ name: decoded.name, email: decoded.emailId, localId: decoded.iss })
        }
        const fetchData = async () => {
            try {
                let token = getUserData();
                const id = mobileId;
                const response = await axios.get(`http://localhost:8080/product/${id}`, { headers: { 'authorization': token } });
                // Your original JSON string
                const jsonString = response.data.data.description
                // Remove the outer double quotes
                //const cleanedJsonString = jsonString.slice(1, -1);
                const cleanedJsonString = jsonString.replace(/\s+/g, ' ');
                // Parse the JSON object
                const jsonObject = JSON.parse(cleanedJsonString);

                console.log(Object.keys(jsonObject));
                setMobile({ ...response.data.data, description: jsonObject });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [mobileId]);

    const logoutUser = () => {
        logout();
        navigate('/login')
    }
    // Check if mobile.description exists before accessing its properties
    if (!mobile.name) {
        { console.log(mobile) }
        return <h1>Loading</h1>;
    }
    const handleAddToCart = async (userId, productId) => {
        try {
            const result = await addToCart(userId, productId);
            window.alert(result); // Show the message in an alert
        } catch (error) {
            window.alert("Can't add product. Please try again later.");
        }
    }

    return (
        <div className="container-fluid">
             <NavBar logoutUser={logoutUser} className="navbar navbar-expand-lg navbar-light bg-light"/>
            <div className="row container-fluid">
            <div className="col-4  d-flex justify-content-center align-items-center">
                <img src={`/image/mobile/${mobile.location}`} alt="Image" />
            </div>
            <div className="col-8 p-5">
                <h1>{mobile.name}</h1>
                <h3>{mobile.price}.00 LKR</h3>
                <div className="">
                <p>Display: {mobile.description.Display}</p>
                <p>Performance: {mobile.description.Performance}</p>
                <p>Ram: {mobile.description.RAM}</p>
                <p>Storage: {mobile.description.Storage}</p>
                <p>Battery Life: {mobile.description["Battery Life"]}</p>
                <p>Camera System: {mobile.description["Camera System"]}</p>
                <p>Other Features: {mobile.description["Other Features"]}</p>
                <p>Colors: {mobile.description.Colors}</p>
                </div>
                <div>
                {isAuthenticated() ?
                    <button className="btn btn-primary" onClick={() => { handleAddToCart(user.localId, mobile.id) }}>Add to Cart</button>
                    :
                    <Link to='/login'>
                        <button className="btn btn-primary">Add to Cart</button>
                    </Link>}
                <Link to="/products">
                    <button className="btn btn-secondary m-2">View Less</button>
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ViewProductPage;
