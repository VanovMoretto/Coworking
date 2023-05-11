import React, {useEffect, useState} from 'react';
import '../../Styles/Home.css';
import generica from '../../imgs/sala.jpg'
import arena from '../../imgs/arena.jpg'
import metodo from '../../imgs/metodo.png'
import Texts from '../../utils/texts';

const images = {
    generica,
    arena,
    metodo,
}


function InfoContainer({ img, isVisible, txt }) {
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
        position: isVisible ? 'relative' : 'absolute',
        width: '100%',
    };

    return (
        <div className={`info-container`} style={containerStyle}>
            <div className="info-img" style={{backgroundImage: `url(${img ? images[img] : arena})`}}></div>
            <div className="info-text">
                {txt ? Texts[txt] : ''}
            </div>
        </div>
    );
}

export default InfoContainer;
