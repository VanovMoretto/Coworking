import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './Styles/App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Reservations from './pages/ReservationPage'
import Footer from './components/Footer';
import MyBookingPage from './components/UserComps/MyBookingsPage';

function App() {
  const [pageTitle] = useState('Coworking');
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="pages-container">
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservas" element={<Reservations />} />
          <Route path="/myAccount/myBookings" element={<MyBookingPage/>} />
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
