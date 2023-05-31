import React from "react";
import Mezanino from '../imgs/mezanino.jpg'
import Arena from '../imgs/arena.jpg'
import Podcast from '../imgs/podcast.jpg'
import Térreo from '../imgs/reunioes.jpg'
import '../Styles/ReservationPage.css'


const images = {
    Mezanino,
    Arena,
    Podcast,
    Térreo
};

const Sala = (props) => {
    return (
        <div className="sala">
            <h1 className="sala-title">{props.title}</h1>
            <img src={images[props.img]} alt="Sala" />
        </div>
    )
}

export default Sala