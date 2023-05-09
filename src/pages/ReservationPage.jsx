import React, { useState } from 'react';
import '../Styles/Salas.css';
import Sala from '../components/Sala'
import Button from '../components/Button/Button';
import Dates from '../components/Dates/Dates';

function Reservations() {

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="parent-container">
      <div className="main-container">
        <Dates onDateSelected={setSelectedDate}/>
      <div className="cards-container">
        <div className="card">
          <Sala title="Térreo" img="reunioes" />
          <Button selectedDate={selectedDate} />
        </div>
        <div className="card">
          <Sala title="Podcast" img="podcast" />
          <Button selectedDate={selectedDate}/>
        </div>
        <div className="card">
          <Sala title="Mezanino" img="mezanino" />
          <Button selectedDate={selectedDate}/>
        </div>
        <div className="card">
          <Sala title="Arena" img="arena" />
          <Button selectedDate={selectedDate}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Reservations;
