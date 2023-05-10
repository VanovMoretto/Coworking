import React from 'react';
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
    const imgSrc = img ? images[img] : arena;
    const bgStyle = { 
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'    // falta ajustar a imagem de fundo
    };
    return (
        <div className={`info-container ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="info-img">
                <img src={img ? images[img] : arena} alt='content' />
            </div>
            <div className="info-text sm" style={bgStyle}>
                {txt ? Texts[txt] : ''}
            </div>
        </div>
    );
}

export default InfoContainer;
