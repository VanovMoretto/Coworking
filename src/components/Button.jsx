import React, { useState } from "react";
import "./Button.css";

export default function Button(props) {
  const [setExibirX] = useState(true);
  const [showHorarios, setShowHorarios] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horarioInicial, setHorarioInicial] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [horarioReservado, setHorarioReservado] = useState("");
  const [reservas, setReservas] = useState([]);
  const [primeiroHorarioSelecionado, setPrimeiroHorarioSelecionado] = useState(false);

  const handleHorariosClick = (event) => {
    setShowHorarios(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };


  function voltarParaPrimeiraLista() {
    setExibirX(true);
    setPrimeiroHorarioSelecionado(false);
  }

  const handleHorarioSelecionado = (horario) => {
    if (!primeiroHorarioSelecionado) {
      setPrimeiroHorarioSelecionado(true);
      setHorarioInicial(horario);
      setHorarioSelecionado(horario); // apenas o primeiro horário é selecionado
    } else {
      setHorarioFinal(horario);
      setShowHorarios(false);
      setHorarioSelecionado(`${horarioInicial} até ${horario}`); // agora usa uma string composta
      setHorarioInicial("");
      setHorarioFinal("");
      setPrimeiroHorarioSelecionado(false);
    }
  };


  const handleFecharClick = () => {
    setShowHorarios(false);
    setHorarioInicial("");
    setHorarioFinal("");
    setPrimeiroHorarioSelecionado(false);
    setExibirX(true);
  };

  const handleReservarClick = () => {
    if (horarioInicial && horarioFinal) { // agora verifica ambos os horários
      setReservas([...reservas, `${horarioInicial} até ${horarioFinal}`]); // usa string composta
      setHorarioReservado(`${horarioInicial} até ${horarioFinal}`); // usa string composta
      setHorarioInicial("");
      setHorarioFinal("");
      setPrimeiroHorarioSelecionado(false);
      alert("Reserva realizada com sucesso!");
    } else {
      alert("Selecione os dois horários antes de reservar.");
    }
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
          {horarioReservado ? "Reservado" : (horarioSelecionado ? (primeiroHorarioSelecionado ? `${horarioInicial} até ${horarioFinal}` : horarioSelecionado) : "Horários")}
        </button>
      </div>
      {showHorarios && (
        <div className={`horarios-container ${primeiroHorarioSelecionado ? 'segunda-lista' : ''}`} style={{ left: position.x, top: position.y }}>
          <span className="fechar" onClick={handleFecharClick}>X</span>
          {horarios
            .filter((horario) => {
              if (!horarioSelecionado || !primeiroHorarioSelecionado) {
                return true;
              } else {
                const [hora, minutos] = horario.split(":").map(Number);
                const [primeiroHora, primeiroMinutos] = horarioSelecionado.split(":").map(Number);
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
          {primeiroHorarioSelecionado && (
            <div className="voltar-wrapper">
              <button className="voltar" onClick={() => voltarParaPrimeiraLista(false)}>Voltar</button>
            </div>
          )}
        </div>
      )}
      <div className="button-wrapper">
        <button className={`reserva${horarioSelecionado && horarioFinal ? " habilitado" : ""}`} onClick={handleReservarClick} disabled={!horarioSelecionado}>
          Reservar
        </button>
      </div>
    </div>
  );
}