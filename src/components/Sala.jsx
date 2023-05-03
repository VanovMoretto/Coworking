import React from "react";
import salaImg from "../imgs/sala.jpg"

const Sala = () => {
    return (
        <div className="sala">
            <h1 className="title">{props.title}</h1>
            <img src={props.img ? props.img : salaImg} alt="Sala" />
        </div>
    )
}

export default Sala