import React, { useState } from "react";
import './Navbar.css'
import logo from '../imgs/D.png'

export default () => {
    const [showMenu, setShowMenu] = useState(false); // Adiciona um estado para controlar a exibição do menu

    const toggleClick = () => {
        
    }

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <h3 className="titulo"><strong>Método Dutra</strong></h3>
            </div>
            <nav className="menu-section">
                <div className="navbar-buttons">
                    <ul>
                        <li>
                            <a href="" className="login">Login</a>
                        </li>
                        <li>
                            <a href="" className="signup">Registrar-se</a>
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