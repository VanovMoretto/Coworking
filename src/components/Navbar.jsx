import React, { useState, useEffect } from "react";
import './Navbar.css'
import logo from '../imgs/D.png'

const Navbar = () => {
    const [show, setShow] = useState(false);

    const toggleClick = () => {
        setShow(!show);
    }

    useEffect(() => {
        const body = document.body;

        body.style.overflow = show ? "hidden" : "initial";
    }, [show]);

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <h3 className="titulo"><strong>Método Dutra</strong></h3>
            </div>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul>
                        <li>
                            <a href="/" className="home">Home</a>
                        </li>
                        <li>
                            <a href="/" className="rooms">Salas</a>
                        </li>
                        <li>
                            <a href="/" className="contact">Contato</a>
                        </li>
                        <li>
                            <a href="/" className="login">Login</a>
                        </li>
                        <li>
                            <a href="/" className="signup">Registrar-se</a>
                        </li>
                    </ul>
                </div>
                <div className="menu-toggle" onClick={toggleClick}>
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
