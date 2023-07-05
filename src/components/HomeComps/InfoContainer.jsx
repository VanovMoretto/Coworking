import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"
import '../../Styles/Home.css';
import arena from '../../assets/imgs/arena.jpg'
import metodo from '../../assets/imgs/metodo.png'
import Texts from '../../utils/texts'
import '../../Styles/Button.css'

const images = {
    arena,
    metodo,
}

// The InfoContainer component displays an informational section. It can dynamically switch between different images and texts.
function InfoContainer({ img, isVisible, txt, btnRoute, btnTxt, target, rel }) {
    // State and effect for handling window resize.
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const imgSrc = img ? images[img] : arena;

    // Effect to handle window resize and set the state accordingly.
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Style calculations based on window size.
    const bgStyle = windowWidth < 450 ? {
        backgroundImage: `url(${imgSrc})`
    } : {};

    const containerStyle = {
        ...bgStyle,
        opacity: isVisible ? 1 : 0,
    };
    
    // Render nothing if the container is not visible.
    if (!isVisible) {
        return null;
    }

    // Return the component markup, using styles and texts dynamically.
    return (
        <div className={`info-container`} style={containerStyle}>
            <div className="info-img" style={{ backgroundImage: `url(${img ? images[img] : arena})` }}></div>
            <div className="info-text">
                {txt ? Texts[txt] : ''}
            </div>
            <div className='info-btn-container'>
                <NavLink target={target} rel={rel} className="info-button" to={btnRoute}>{btnTxt}</NavLink>
            </div>
        </div>
    );
}

export default InfoContainer;
