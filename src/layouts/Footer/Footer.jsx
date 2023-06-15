import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="footer-content">
                <div className="contacts-container">
                    <h3 className="contacts">Contato</h3>
                    <div className="email-container">
                    <FontAwesomeIcon icon={faAt} className="email-icon" />
                    <p className="contacts-email">relacionamento@metododutra.com.br</p>
                    </div>
                    <div className="phone-container">
                    <FontAwesomeIcon icon={faPhone} className="phone-icon" />
                    <p className="contacts-phone">(51) 3527-4145</p>
                    </div>  
                </div>
                <div className="social-medias">
                    <h3 className="socialmedia-title">Redes Sociais</h3>
                    <a href="https://www.facebook.com/MetodoDutra" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon style={{ color: '#1877F2'}} icon={faFacebook} />
                    </a>
                    <a href="https://www.linkedin.com/in/método-dutra-6180b361/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon style={{ color: '#0077B5' }} icon={faLinkedin} />
                    </a>
                    <a href="https://wa.me/555193102082" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon style={{ color: '#25D366' }} icon={faWhatsapp} />
                    </a>
                    <a href="https://www.instagram.com/metododutra/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon style={{ color: '#C13584' }} icon={faInstagram} />
                    </a>
                </div>
            </div>
            <div className="copyright-container">
                <p className="copyright-text">© 2023. Todos os Direitos Reservados. Desenvolvido por <a href="https://github.com/VanovMoretto/" className="copyright-link">Vanov Moretto</a></p>
            </div>
        </div>
    )
}

export default Footer 