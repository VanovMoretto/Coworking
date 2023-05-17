import React, { useState } from 'react';
import '../Styles/Salas.css';
import Sala from '../utils/Sala'
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
          <Sala title="Térreo" img="Térreo" />
          <Button selectedDate={selectedDate} room="Térreo"/>
        </div>
        <div className="card">
          <Sala title="Podcast" img="Podcast" />
          <Button selectedDate={selectedDate} room="Podcast"/>
        </div>
        <div className="card">
          <Sala title="Mezanino" img="Mezanino" />
          <Button selectedDate={selectedDate} room="Mezanino"/>
        </div>
        <div className="card">
          <Sala title="Arena" img="Arena" />
          <Button selectedDate={selectedDate}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Reservations;
