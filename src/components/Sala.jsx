import React from "react";
import salaImg from "../imgs/sala.jpg"

export default props => {
    return (
        <div className="sala">
            <h1 className="title">{props.title}</h1>
            <img src={salaImg} alt="Sala" />
        </div>
    )
}