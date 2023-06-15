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

function InfoContainer({ img, isVisible, txt, btnRoute, btnTxt, target, rel }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const imgSrc = img ? images[img] : arena;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const bgStyle = windowWidth < 450 ? {
        backgroundImage: `url(${imgSrc})`
    } : {};

    const containerStyle = {
        ...bgStyle,
        opacity: isVisible ? 1 : 0,
    };

    if (!isVisible) {
        return null;
    }

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
