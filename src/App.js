import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './Styles/App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SignIn from './pages/Signin';
import Reservations from './pages/ReservationPage'
import SignUp from './pages/Signup';

function App() {
  const [pageTitle] = useState('Coworking');
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="pages-container">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reservas" element={<Reservations />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
