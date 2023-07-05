import React from "react";
import NotFoundImg from '../assets/imgs/e404.png'
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={NotFoundImg} alt="Error404" style={{ maxWidth: '250px' }} />
            <p
                style={{ margin: '20px', color: '#fff' }}>
                Oooops! Parece que você está <span style={{ color: '#34cad2', fontWeight: 'bold' }}>perdido</span>, a pagina <span style={{ color: '#34cad2', fontWeight: 'bold' }}>não foi encontrada!</span>
            </p>
            <p
                style={{ margin: '20px', color: '#fff' }}>
                Você pode retornar para a home clicando <Link to="/"> <span style={{ color: '#34cad2' }}>aqui</span></Link>.
            </p>
        </div>
    )
}

export default NotFound