import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import SigninSignup from "../pages/SingninSignup";
import logo from '../imgs/D.png'
import Modal from "react-modal"
import '../Styles/Navbar.css'





Modal.setAppElement('#root');

const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    const toggleClick = (e) => {
        e.stopPropagation();
        setShow(!show);
    }

    const handleLogout = () => {
        auth.signOut()
          .then(() => {
            setUser(null);
            setDropdownOpen(false);
            navigate("/"); 
          })
          .catch((error) => {
            // Trate qualquer erro que possa ocorrer durante o logout
            console.error("Erro ao sair: ", error);
          });
      };

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                // Carrega os dados adicionais do usuário do Firestore
                const userDoc = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    // Colocar o primeiro nome no displayName
                    const { fullName } = docSnap.data();
                    const firstName = fullName.split(' ')[0];
                    user.displayName = firstName;
                }
            }

            setUser(user);
        });

        // limpeza na desmontagem
        return () => unsubscribe();
    }, []);

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

    // close dropdown when clicked out of it anywhere on the screen
    useEffect(() => {
        const isClickOut = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", isClickOut);
        return () => {
            document.removeEventListener("mousedown", isClickOut);
        };
    }, []);

    return (
        <div className="navbar">
            <Link className="navbar-logo" to="/">
                <img className="logo" src={logo} alt="Logo" />
                <h3 className="titulo"><strong>Método Dutra Reservas</strong></h3>
            </Link>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul className="nav-ul" >
                        {[
                            { name: "Home", path: "/" },
                            { name: "Reservas", path: "/reservas" },
                            { name: "Sobre", path: "/about" },
                            user ? (
                                {
                                    name: `Olá, ${user.displayName || ''}`,
                                    className: "dropdown",
                                    onClick: () => {
                                        setDropdownOpen(!dropdownOpen);
                                    }
                                }

                            ) : (
                                {
                                    name: "Entrar",
                                    className: 'btn-entrar',
                                    onClick: () => {
                                        setModalIsOpen(true);
                                        setShow(false);
                                    }
                                }
                            ),
                        ].map((item, index) => (
                            <li key={index} style={{ "--i": index + 1 }} className="nav-li">
                                {item.onClick ? (
                                    <button
                                        className={`${item.name.split(',')[0].toLowerCase().replace(" ", "")} ${item.className}`}
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
                        {dropdownOpen && (
                            <div className="dropdown-menu" ref={dropdownRef}>
                                <button onClick={handleLogout}>Sair</button>
                            </div>
                        )}
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
