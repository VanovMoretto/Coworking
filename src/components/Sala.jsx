import React from "react";
import salaImg from "../imgs/sala.jpg"
import mezanino from '../imgs/mezanino.jpg'
import arena from '../imgs/arena.jpg'
import podcast from '../imgs/podcast.jpg'
import reunioes from '../imgs/reunioes.jpg'


const images = {
    mezanino,
    arena,
    podcast,
    reunioes
};

const Sala = (props) => {
    return (
        <div className="sala">
            <h1 className="title">{props.title}</h1>
            <img src={props.img ? images[props.img] : salaImg} alt="Sala" />
        </div>
    )
}

export default Sala