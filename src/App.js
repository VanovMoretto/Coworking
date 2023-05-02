import React from 'react';
import './App.css';
import Sala from './components/Sala';
import Button from './components/Button';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <div className="parent-container">
      <Navbar />
      <div className="main-container">
        <div className="card">
          <Sala title="Térreo" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Podcast" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Mezanino" />
          <Button />
        </div>
        <div className="card">
          <Sala title="Arena" />
          <Button />
        </div>
      </div>
    </div>
  );
}

export default App;
