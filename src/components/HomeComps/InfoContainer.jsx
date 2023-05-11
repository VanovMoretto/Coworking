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

    return (
        <div className={`info-container ${isVisible ? 'visible' : 'hidden'}`} style={bgStyle}>
            <div className="info-img">
                <img src={img ? images[img] : arena} alt='content' />
            </div>
            <div className="info-text">
                {txt ? Texts[txt] : ''}
            </div>
        </div>
    );
}

export default InfoContainer;
