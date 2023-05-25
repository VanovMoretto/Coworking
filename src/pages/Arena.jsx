import React from "react";
import '../Styles/Arena.css'
import arena from "../imgs/arena.jpg"
import equipments from "../imgs/equipments.png"
import bigscreen from "../imgs/bigscreen.png"
import plateia from "../imgs/plateia.png"

const ArenaBooking = () => {
    return(
        <div className="arena-page">
            <div className="containers-holder">
                <div className="arena-screen">
                    <img src={arena} alt="arena" />
                </div>
                <div className="description">
                    <p className="description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, porro vitae? Quo libero illo, nemo deserunt quae, nesciunt voluptatem veritatis amet deleniti error ducimus! Pariatur laborum maxime at sit amet?</p>
                </div>
                <div className="cards-holder">
                    <div className="bigscreen">
                        <img src={bigscreen} alt="bigscreen" />
                        <p className="short-text">A arena está equipada com um telão de alta definição com mais de 200 polegadas</p>
                    </div>
                    <div className="equipments">
                        <img src={equipments} alt="equipments" />
                        <p className="short-text equip">Equipamentos para controlar a arena toda, seus diversos tipos de luzes para ilumiunar do jeito que prefere, som surround na arena toda e fumaça para deixar o ambiente mais impactante.</p>
                    </div>
                    <div className="seats">
                        <img src={plateia} alt="plateia" />
                        <p className="short-text plateia">Contamos também com um palco em forma de teatro, garantido a todos a melhor visão. Tanto para quem assiste quanto para quem palestra ou apresenta. Além de assentos bem confortáveis.</p>
                    </div>
                </div>
                <div className="booking-container">
                    <h2 className="booknow">Reserve agora com nossa Coordenadora de Eventos!</h2>
                    <input type="text" className="arena-fullName" />
                    <input type="email" className="arena-email" />
                    <input type="phone" className="arena-phone" />
                    <input type="text" className="event-description" />
                    <input type="text" className="additional-box" />
                </div>
                <button className="arena-submit">Enviar</button>
            </div>
        </div>
    )
}

export default ArenaBooking