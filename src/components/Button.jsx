import React, { useState } from "react";
import "./Button.css";

export default function Button(props) {
  const [showHorarios, setShowHorarios] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [horarioReservado, setHorarioReservado] = useState(null);
  const [reservas, setReservas] = useState([]);

  const handleHorariosClick = (event) => {
    setShowHorarios(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleHorarioSelecionado = (horario) => {
    setHorarioSelecionado(horario);
    setShowHorarios(false);
  };

  const handleFecharClick = () => {
    setShowHorarios(false);
  };

  const handleReservarClick = () => {
    setReservas([...reservas, horarioSelecionado]);
    setHorarioReservado(horarioSelecionado);
    setHorarioSelecionado(null);
  };

  const horarioLimite = 21.5 * 60; // 21:30 em minutos

  const horarios = [];
  for (let hora = 7.5; hora <= 22; hora += 0.5) {
    const horaInteira = Math.floor(hora);
    const minutos = hora === horaInteira ? "00" : "30";
    const horario = `${horaInteira.toString().padStart(2, "0")}:${minutos}`;
    const horarioEmMinutos = horaInteira * 60 + (minutos === "00" ? 0 : 30);
    if (horarioEmMinutos > horarioLimite) break;
    horarios.push(horario);
  }

  return (
    <div className="button-container">
      <div className="button-wrapper">
        <button className="horario" onClick={handleHorariosClick}>
          {horarioReservado ? "Reservado" : (horarioSelecionado ? horarioSelecionado : "Horários")}
        </button>
      </div>
      {showHorarios && (
        <div className="horarios-container aberto">
          <span className="fechar" onClick={handleFecharClick}>X</span>
          {horarios.map((horario, index) => (
            <button key={index} onClick={() => handleHorarioSelecionado(horario)}>
              {horario}
            </button>
          ))}
        </div>
      )}
      <div className="button-wrapper">
        <button className={`reserva${horarioSelecionado ? " habilitado" : ""}`} onClick={handleReservarClick} disabled={!horarioSelecionado}>
          Reservar
        </button>
      </div>
    </div>
  );
}
