import React, { useEffect } from "react";
import MyBookingDisplay from "./MyBookingDisplay";
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Firebase';
import dayjs from 'dayjs';
import Sala from '../../utils/Sala';
import '../../Styles/BookingPage.css'

const MyBookingPage = () => {
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedBookings = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
        // Ordena as reservas por horário de início
        const sortedBookings = fetchedBookings.sort((a, b) => {
          return dayjs(a.initialTime.toDate()).isAfter(dayjs(b.initialTime.toDate())) ? 1 : -1;
        });
  
        setBookings(sortedBookings);
      }
    };
  
    fetchBookings();
  }, []);

  const delBooking = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar sua reserva?")) {
      const bookingRef = doc(db, 'reservations', id);
  
      try {
        await deleteDoc(bookingRef);
  
        // Remover a reserva cancelada do estado
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
      } catch (error) {
        console.error("Erro ao cancelar reserva: ", error);
      }
    }
  };
  
  

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
          <div className="booking-button">
            <button className="cancel-button" onClick={() => delBooking(booking.id)}>Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyBookingPage;
