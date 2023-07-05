import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import '../Styles/ReservationPage.css';
import Sala from '../utils/Sala'
import BookingButton from '../components/BookingButtons/BookingButton';
import Dates from '../components/Dates/Dates';
import ArenaButton from '../components/BookingButtons/ArenaButton';
import { ReservationContext } from '../contexts/ReservationContext';
import SlidePanel from '../components/SlidePanel';
import RequireLogin from '../utils/RequireLogin';

// The Reservations component is the main interface for making reservations. 
// It ensures the user is logged in, allows selection of dates and rooms, and initiates the reservation process.
function Reservations() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [showSlidePanel, setShowSlidePanel] = useState(false);
  const [reservationData, setReservationData] = useState({});
  const navigate = useNavigate()
  const auth = getAuth();

   // clearSelection function: responsible for resetting the reservation data.
   const clearSelection = () => {
    setReservationData({});
  };

  // useEffect hook: checks if the user is logged in and navigates to login page if not.
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/requireLogin");
    }
  }, [auth, navigate]);

  // Checks if the user is not logged in and returns a RequireLogin component if true.
  if (!auth.currentUser) {
    return <RequireLogin />;
  }

  // Rendering the component with its reservation system...
  return (
    <div className="parent-container">
      <div className="main-container">
        <ReservationContext.Provider value={{
          reservationData, setReservationData,
          showSlidePanel, setShowSlidePanel,
          clearSelection,
        }}>
          <SlidePanel />
          <Dates onDateSelected={setSelectedDate} />
          <div className="cards-container">
            <div className="card">
              <Sala title="Térreo" img="Térreo" />
              <BookingButton selectedDate={selectedDate} room="Térreo" />
            </div>
            <div className="card">
              <Sala title="Podcast" img="Podcast" />
              <BookingButton selectedDate={selectedDate} room="Podcast" />
            </div>
            <div className="card">
              <Sala title="Mezanino" img="Mezanino" />
              <BookingButton selectedDate={selectedDate} room="Mezanino" />
            </div>
            <div className="card">
              <Sala title="Arena" img="Arena" />
              <ArenaButton />
            </div>
          </div>
        </ReservationContext.Provider>
      </div>
    </div>
  );
}

export default Reservations;
