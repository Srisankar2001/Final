import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../services/Auth"
import { useNavigate , Link } from "react-router-dom"
import axios from "axios";
import { getUserData } from "../services/Storage";
import { addToCart } from "../services/Api";
import { jwtDecode } from "jwt-decode";


function ProductPage() {
    const [brands, setBrands] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
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
                const responseBrand = await axios.get("http://localhost:8080/brand", { headers: { 'authorization': token } });
                const responseMobile = await axios.get("http://localhost:8080/products", { headers: { 'authorization': token } });
                setBrands(responseBrand.data);
                setMobiles(responseMobile.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [selectedBrand]);
    const logoutUser = () => {
        logout();
        navigate('/login')
    }

    const handleBrandClick = (brandId) => {
        setSelectedBrand(brandId);
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.querySelector('.button-container').style.display = 'flex';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.querySelector('.button-container').style.display = 'none';
    };
    const handleAddToCart = async (userId, productId) => {
        try {
            const result = await addToCart(userId, productId);
            window.alert(result); 
        } catch (error) {
            window.alert("Can't add product. Please try again later.");
        }
    }

    return (
        <div>
            <NavBar logoutUser={logoutUser} className="navbar navbar-expand-lg navbar-light bg-light"/>
            <div className="container-fluid">
                <div className="row">
                    <nav className=" navbar-expand-lg  navbar-left col-2 d-flex jusity-content-start align-item-start" id="navbar">
                        <div className="container-fluid flex-column">
                            <a className="navbar-brand" href="#">Brands</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon bg-primary"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
                                    {brands.map((brand) => (
                                        <li key={brand.id} className="nav-item">
                                            <a className="nav-link" href="#" onClick={() => handleBrandClick(brand.id)}>
                                                <img className="mx-2" src={`image/logos/${brand.location}`} height="30px" width="30px" alt={brand.name} />
                                                {brand.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="col-10 container mt-4">
                        <div className="row d-flex jusity-content-center align-item-center">
                            {mobiles.filter(mobile => selectedBrand ? mobile.brand_id === selectedBrand : true).map((mobile, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-6 d-flex d-column jusity-content-center align-item-center" style={{ marginTop:"30px" }}>
                                    <div className="card d-flex jusity-content-center align-item-center" style={{ width: "20rem",height:"400px", position: "relative" }}>
                                        <img src={`image/mobile/${mobile.location}`} className="card-img-top p-5" alt={mobile.name} height="250px" width="150px" />
                                        <div className="card-body" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <h5 className="card-title">{mobile.name}</h5>
                                            <p className="card-text">{mobile.price}.00 LKR</p>
                                            <div className="button-container " style={{ display: "none", position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                                                {isAuthenticated() ?
                                                    <button className="btn btn-primary " onClick={() => { handleAddToCart(user.localId, mobile.id) }} style={{ width: "70px",height:"50px",marginTop:"5px" }}>Cart</button>
                                                    :
                                                    <Link to='/login'>
                                                        <button className="btn btn-primary mt-2" style={{ width: "70px",height:"50px" ,marginTop:"15px"}}>Cart</button>
                                                    </Link>}
                                                <Link to={`${mobile.id}`}>
                                                    <button className="btn btn-secondary m-1 " style={{ width: "70px",height:"50px" ,marginTop:"10px" , marginRight:"20px"}}>View</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
