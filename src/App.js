import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './Styles/App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Reservations from './pages/ReservationPage'
import Footer from './components/Footer';
import MyBookingPage from './components/UserComps/MyBookingsPage';
import MyAccount from './components/UserComps/MyAccountPage';
import RequireLogin from './utils/RequireLogin';
import EmailUpdate from './components/UserComps/EmailUpdatePage';
import PasswordUpdate from './components/UserComps/PasswordUpdatePage';
import ArenaBooking from './pages/Arena';
import ForgotPassword from './components/UserComps/ForgotPassword';
import NotFound from './pages/404Page';

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
          <Route path="/reservas" element={<Reservations />} />
          <Route path="/arena" element={<ArenaBooking />} />
          <Route path='/myAccount' element={<MyAccount />} />
          <Route path="/myBookings" element={<MyBookingPage/>} />
          <Route path='/emailUpdate' element={<EmailUpdate/>} />
          <Route path='/passwordUpdate' element={<PasswordUpdate/>} />
          <Route path='/forgotPassword' element={<ForgotPassword/>} />
          <Route path="/requireLogin" element={<RequireLogin/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
