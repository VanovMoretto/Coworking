import React, { useState } from "react";
import "./Button.css";

export default function Button(props) {
  const [showHorarios, setShowHorarios] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horarioInicial, setHorarioInicial] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleHorariosClick = (event) => {
    setShowHorarios(true);
    const rect = event.target.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top - rect.height - 10 });
  };
  

  const handleHorarioSelecionado = (horario) => {
    if (!horarioInicial) {
      setHorarioInicial(horario);
    } else if (!horarioFinal) {
      setHorarioFinal(horario);
      setShowHorarios(false);
      setHorarioSelecionado(`${horarioInicial} até ${horario}`);
    }
  };

  const handleFecharClick = () => {
    setShowHorarios(false);
    setHorarioInicial("");
    setHorarioFinal("");
  };

  const handleReservarClick = () => {
    if (horarioInicial && horarioFinal) {
      alert("Reserva realizada com sucesso!");
      setHorarioSelecionado("");
      setHorarioInicial("");
      setHorarioFinal("");
    } else {
      alert("Selecione os dois horários antes de reservar.");
    }
  };

  const horarios = [];
  for (let hora = 7.5; hora <= 22; hora += 0.5) {
    const horaInteira = Math.floor(hora);
    const minutos = hora === horaInteira ? "00" : "30";
    horarios.push(`${horaInteira.toString().padStart(2, "0")}:${minutos}`);
  }

  return (
    <div className="button-container">
      <div className="button-wrapper">
        <button className="horario" onClick={handleHorariosClick}>
          {horarioSelecionado || "Horários"}
        </button>
      </div>
      {showHorarios && (
        <div className="horarios-container" style={{ left: position.x, top: position.y }}>
          <span className="fechar" onClick={handleFecharClick}>X</span>
          {horarios
            .filter((horario) => {
              if (!horarioInicial) {
                return true;
              } else {
                const [hora, minutos] = horario.split(":").map(Number);
                const [primeiroHora, primeiroMinutos] = horarioInicial.split(":").map(Number);
                const primeiroHorarioEmMinutos = primeiroHora * 60 + primeiroMinutos;
                const horarioEmMinutos = hora * 60 + minutos;
                return horarioEmMinutos > primeiroHorarioEmMinutos + 30;
              }
            })
            .map((horario, index) => (
              <button className="btn-horario" key={index} onClick={() => handleHorarioSelecionado(horario)}>
                {horario}
              </button>
            ))}
        </div>
      )}
      <div className="button-wrapper">
        <button className={`reserva${horarioSelecionado && horarioFinal ? " habilitado" : ""}`} onClick={handleReservarClick} disabled={!horarioInicial || !horarioFinal}>
Reservar
</button>
</div>
</div>
);
}
