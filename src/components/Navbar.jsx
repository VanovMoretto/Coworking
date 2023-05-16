import React, { useState, useEffect } from "react";
import '../Styles/Navbar.css'
import logo from '../imgs/D.png'
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal"
import SigninSignup from "./SingninSignup";



Modal.setAppElement('#root');

const Navbar = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
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
        {
            name: "Entrar",
            className: 'btn-entrar',
            onClick: () => {
                setModalIsOpen(true);
                setShow(false);
            }
        },
    ];

    useEffect(() => {

        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }


        return () => {
            document.body.style.overflow = 'initial';
        };
    }, [modalIsOpen]);


    return (
        <div className="navbar">
            <Link className="navbar-logo" to="/">
                <img className="logo" src={logo} alt="Logo" />
                <h3 className="titulo"><strong>Método Dutra Reservas</strong></h3>
            </Link>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul className="nav-ul" >
                        {navItems.map((item, index) => (
                            <li key={index} style={{ "--i": index + 1 }} className="nav-li">
                                {item.onClick ? (
                                    <button
                                        className={`${item.name.toLowerCase().replace(" ", "")} ${item.className}`}
                                        onClick={item.onClick}
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={item.name.toLowerCase().replace(" ", "")}
                                        onClick={toggleClick}
                                    >
                                        {item.name}
                                    </Link>
                                )}
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)} // Fecha o modal quando o usuário clica fora dele
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'auto',
                            paddingBottom: '20px'
                        },
                        content: {
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'static',
                            width: 'auto',
                            height: 'auto',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            border: 'none'
                        }
                    }
                }
            >

                <SigninSignup closeModal={() => setModalIsOpen(false)} />
            </Modal>
        </div >
    )
}

export default Navbar
