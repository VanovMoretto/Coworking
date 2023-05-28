import React, { useState } from 'react';
import '../Styles/Salas.css';
import Sala from '../utils/Sala'
import BookingButton from '../components/BookingButtons/BookingButton';
import Dates from '../components/Dates/Dates';
import ArenaButton from '../components/BookingButtons/ArenaButton';

function Reservations() {

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="parent-container">
      <div className="main-container">
        <Dates onDateSelected={setSelectedDate}/>
      <div className="cards-container">
        <div className="card">
          <Sala title="Térreo" img="Térreo" />
          <BookingButton selectedDate={selectedDate} room="Térreo"/>
        </div>
        <div className="card">
          <Sala title="Podcast" img="Podcast" />
          <BookingButton selectedDate={selectedDate} room="Podcast"/>
        </div>
        <div className="card">
          <Sala title="Mezanino" img="Mezanino" />
          <BookingButton selectedDate={selectedDate} room="Mezanino"/>
        </div>
        <div className="card">
          <Sala title="Arena" img="Arena" />
          <ArenaButton/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Reservations;
