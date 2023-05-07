import React, { useState, useEffect } from 'react';
import './App.css';
import Sala from './components/Sala';
import Button from './components/Button';
import Navbar from './components/Navbar';
import Dates from './components/Dates';

function App() {
  const [pageTitle] = useState('Coworking');
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="parent-container">
      <Navbar />
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

export default App;
