import React from "react";
import './Navbar.css'
import logo from '../imgs/D.png'


export default props => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <h3 className="titulo"><strong>Método Dutra</strong></h3>
            </div>
            <div className="navbar-buttons">
            <button className="login">Login</button>
            <button className="signup">Registrar-se</button>
            </div>
        </nav>
    )
}