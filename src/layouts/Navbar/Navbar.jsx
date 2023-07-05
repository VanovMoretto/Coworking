// The Navbar component handles the rendering of the navigation bar at the top of the page. 
// It allows users to navigate through the website, provides access to user-related 
// pages (account info, bookings) based on authentication status, and offers the 
// ability to log in or log out.

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { updateUserDisplayName } from "../../utils/userUtils.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import SigninSignup from "../../pages/SigninSignup";
import logo from '../../assets/imgs/dutraLogo.png'
import Modal from "react-modal"
import './Navbar.css'

Modal.setAppElement('#root');

const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const isScreen850 = useMediaQuery('(max-width:850px)');
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to toggle the mobile navigation menu
    const toggleClick = (e) => {
        e.stopPropagation();
        setShow(!show);
    }

    // Function to handle logout, triggered by 'Logout' button
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
                setDropdownOpen(false);
                navigate("/");
            })
            .catch((error) => {
                console.error("Erro ao sair: ", error);
            });
    };

    // Effects to handle showing/hiding of nav based on state, changes in location, 
    // scrolling to the selected section from hash, and modal display effects
    // Most of these effects use event listeners and update CSS to modify the UI 

    useEffect(() => {
        const body = document.body;

        body.style.overflow = show ? "hidden" : "initial";
    }, [show]);

    useEffect(() => {
        const isLocationChanged = () => {
            setShow(false);
        };

        isLocationChanged(); // Call the function once to ensure the state is updated correctly

        // Add a listener to the "location" object
        const unlisten = () => {
            window.removeEventListener("popstate", isLocationChanged);
            window.removeEventListener("pushstate", isLocationChanged);
            window.removeEventListener("replacestate", isLocationChanged);
        };

        window.addEventListener("popstate", isLocationChanged);
        window.addEventListener("pushstate", isLocationChanged);
        window.addEventListener("replacestate", isLocationChanged);

        // Return a cleanup function to remove the listener when the component is unmounted
        return unlisten;
    }, [location]);

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({behavior: "smooth"})
            }
        } else {
        window.scrollTo({behavior: "smooth", top: 0, left: 0})
        }
    }, [location,]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                await updateUserDisplayName(user);
            }
            
            setUser(user);
        });
    
        // clear on dismount
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
            </Link>
            <nav className={`menu-section ${show ? "on" : ""}`}>
                <div className="navbar-buttons">
                    <ul className="nav-ul" >
                    {user && <p className="user-hidden show">Olá, {user.displayName}</p>}
                        {[
                            { name: "Home", path: "/" },
                            {
                                name: "Reservas",
                                onClick: () => {
                                    if (user) {
                                        navigate("/reservas");
                                    } else {
                                        navigate("/requireLogin");
                                    }
                                }
                            },
                            { name: "Sobre", onClick: () => navigate('/#about')},
                            user && isScreen850 ? { name: "Minha Conta", path: "/myAccount" } : null,
                            user && isScreen850 ? { name: "Minhas Reservas", path: "/myBookings" } : null,
                            user ? {
                                name: `Olá, ${user.displayName || ''}`,
                                className: "dropdown ul-hidden",
                                onClick: () => {
                                    setDropdownOpen(!dropdownOpen);
                                }
                            } : {
                                name: "Entrar",
                                className: 'btn-entrar ul-hidden',
                                onClick: () => {
                                    setModalIsOpen(true);
                                    setShow(false);
                                }
                            },
                            user && isScreen850 ? { name: "Sair", className: "logout-btn", onClick: handleLogout } : null,
                        ].filter(Boolean).map((item, index) => (
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
                                <Link to={'/myAccount'} className="myAccount-button" onClick={() => setDropdownOpen(false)}>Minha conta</Link>
                                <Link to={'/myBookings'} className="myBookings-button" onClick={() => setDropdownOpen(false)}>Minhas reservas</Link>
                                <button className="logout-button" onClick={handleLogout}>Sair</button>
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
                onRequestClose={() => setModalIsOpen(false)} // Closes the modal when the user clicks outside of it
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgb(0 0 0 / 0.75)',
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
                            border: 'none',
                            overflow: 'hidden',
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
