import React from "react";
import MyBookingDisplay from "./MyBookingDisplay";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Firebase';
import Sala from '../../utils/Sala';
import '../../Styles/BookingPage.css'

const MyBookingPage = () => {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    const fetchBookings = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setBookings(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-main-container">
      <div className="booking-title-container">
        <h2 className="booking-title">Minhas Reservas</h2>
      </div>
      {bookings.map((booking, index) => (
        <div key={index} className="booking-box">
          <div className="booking-infos">
            <div className="booking-img">
              <Sala className="booking-img" img={booking.room} />
            </div>
            <div className="booking-display-container">
              <MyBookingDisplay booking={booking} />
            </div>
          </div>
          <div className="booking-buttons">
            <button className="change-button">Alterar</button>
            <button className="cancel-button">Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyBookingPage;
