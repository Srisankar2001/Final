/* global bootstrap */
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../services/Auth";
import { Navigate, useNavigate } from "react-router-dom";

import apple from "../image/flyer/apple.jpg";
import samsung from "../image/flyer/samsung.jpg";
import oppo from "../image/flyer/oppo.jpg";
import redmi from "../image/flyer/redmi.jpg";
import rog from "../image/flyer/rog.jpg";

function HomePage() {
    const navigate = useNavigate();
    const logoutUser = () => {
        logout();
        navigate('/login');
    }

    useEffect(() => {
        const carousel = document.getElementById('carouselExampleSlidesOnly');
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 3000 
        });

        bsCarousel._config.interval = 100;
    }, []); 

    return (
        <div>
            <NavBar logoutUser={logoutUser} />
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <img src={apple} className="d-block w-100" alt="Apple"/>
                    </div>
                    <div className="carousel-item active">
                        <img src={samsung} className="d-block w-100" alt="Samsung"/>
                    </div>
                    <div className="carousel-item">
                        <img src={redmi} className="d-block w-100" alt="Redmi"/>
                    </div>
                    <div className="carousel-item">
                        <img src={oppo} className="d-block w-100" alt="Oppo"/>
                    </div>
                    <div className="carousel-item">
                        <img src={rog} className="d-block w-100" alt="Rog"/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HomePage;
