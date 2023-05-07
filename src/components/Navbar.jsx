import React, { useState, useEffect } from "react";
import '../Styles/Navbar.css'
import logo from '../imgs/D.png'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const location = useLocation();

    const toggleClick = (e) => {
        e.stopPropagation();
        setShow(!show);
    }

    useEffect(() => {
        const body = document.body;

        body.style.overflow = show ? "hidden" : "initial";
    }, [show]);

    useEffect(() => {
        const isLocationChanged = () => {
            setShow(false);
        };

        isLocationChanged(); // Chame a função uma vez para garantir que o estado seja atualizado corretamente

        // Adicione um ouvinte ao objeto "location"
        const unlisten = () => {
            window.removeEventListener("popstate", isLocationChanged);
            window.removeEventListener("pushstate", isLocationChanged);
            window.removeEventListener("replacestate", isLocationChanged);
        };

        window.addEventListener("popstate", isLocationChanged);
        window.addEventListener("pushstate", isLocationChanged);
        window.addEventListener("replacestate", isLocationChanged);

        // Retorne uma função de limpeza para remover o ouvinte quando o componente for desmontado
        return unlisten;
    }, [location]);


    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img className="logo" src={logo} alt="Logo" onClick={() => { window.location.href = "/" }} />
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
