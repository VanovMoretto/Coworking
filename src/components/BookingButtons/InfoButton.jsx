import React from 'react';
import { Link } from "react-router-dom";
import '../../Styles/Button.css'

function InfoButton({ type }) {

    switch(type) {
        case 'arena':
            return <Link to="/reservas" className="info-button">Reserve já!</Link>;
        case 'metodo':
            return <Link to="/about" className="info-button">Saiba mais...</Link>;
        default:
            return null;
    }
}

export default InfoButton;
