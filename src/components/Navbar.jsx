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

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Reservas", path: "/reservas" },
        { name: "Sobre", path: "/about" },
        { name: "Login", path: "/signin" },
        { name: "Criar Conta", path: "/signup" },
    ];
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img className="logo" src={logo} alt="Logo" onClick={() => { window.location.href = "/home" }} />
                <h3 className="titulo" onClick={() => { window.location.href = "/home" }}><strong>Método Dutra Reservas</strong></h3>
            </div>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} style={{ "--i": index + 1 }}>
                                <Link
                                    to={item.path}
                                    className={item.name.toLowerCase().replace(" ", "")}
                                    onClick={toggleClick}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
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
