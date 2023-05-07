import React, { useState, useEffect } from "react";
import '../Styles/Navbar.css'
import logo from '../imgs/D.png'
import { Link } from "react-router-dom";

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
                <img className="logo" src={logo} alt="Logo" onClick={() => { window.location.href = "/" }}/>
                <h3 className="titulo" onClick={() => { window.location.href = "/" }}><strong>Método Dutra Reservas</strong></h3>
            </div>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul>
                        <li>
                            <Link to="/" className="home" onClick={toggleClick}>Home</Link>
                        </li>
                        <li>
                            <Link to="/sala" className="rooms" onClick={toggleClick}>Salas</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="contact" onClick={toggleClick}>Contato</Link>
                        </li>
                        <li>
                            <Link to="/about" className="about" onClick={toggleClick}>Sobre nós</Link>
                        </li>
                        <li>
                            <Link to="/" className="login" onClick={toggleClick}>Login</Link>
                        </li>
                        <li>
                            <Link to="/" className="signup" onClick={toggleClick}>Registrar-se</Link>
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
