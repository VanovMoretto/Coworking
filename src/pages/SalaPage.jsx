import React from 'react';
import '../Styles/Salas.css';
import Sala from '../components/Sala'
import Button from '../components/Button/Button';
import Dates from '../components/Dates/Dates';

function PageSalas() {

  return (
    <div className="parent-container">
      <div className="main-container">
        <Dates/>
      <div className="cards-container">
        <div className="card">
          <Sala title="Térreo" img="reunioes" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Podcast" img="podcast" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Mezanino" img="mezanino" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Arena" img="arena" />
          <Button />
        </div>
      </div>
      </div>
    </div>
  );
}

export default PageSalas;
