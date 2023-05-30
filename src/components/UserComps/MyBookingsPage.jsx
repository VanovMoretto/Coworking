import React, { useEffect, useState } from "react";
import { MyBookingDisplay, PastBookingDisplay } from "./MyBookingDisplay";
import RequireLogin from "../../utils/RequireLogin";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Firebase';
import dayjs from 'dayjs';
import Sala from '../../utils/Sala';
import '../../Styles/BookingPage.css'


const CurrentBookings = ({ bookings, delBooking }) => {
  return (
    <div className="current-bookings-container">
      <h3 className="booking-h3">Próximas reservas</h3>
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
            <button className="cancel-button" onClick={() => delBooking(booking.id, false)}>Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const PastBookings = ({ bookings, delBooking }) => {
  return (
    <div className="past-bookings-container">
      <h3 className="booking-h3">Histórico de reservas</h3>
      {bookings.map((booking, index) => (
        <div key={index} className="past-booking-box">
          <div className="past-booking-infos">
            <div>
              <PastBookingDisplay booking={booking} />
            </div>
            <button className="erase-button" onClick={() => delBooking(booking.id, true)}>Apagar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {

    if (!auth.currentUser) {
      // Redireciona o usuário para a página de login se ele não estiver logado
      navigate("/requireLogin");
    } else {
      const fetchBookings = async () => {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedBookings = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

          const currentBookings = [];
          const oldBookings = [];

          // Divide as reservas em futuras e passadas
          fetchedBookings.forEach(booking => {
            if (dayjs(booking.initialTime.toDate()).isAfter(dayjs())) {
              currentBookings.push(booking);
            } else {
              oldBookings.push(booking);
            }
          });

          setBookings(currentBookings);
          setPastBookings(oldBookings);
        }
      };

      fetchBookings();
    }

  }, [auth, navigate]);

  const delBooking = async (id, isPast) => { // Adicionamos o argumento "isPast"
    if (window.confirm(isPast ? "Deseja apagar a reserva do histórico?" : "Tem certeza que deseja cancelar sua reserva?")) {
      const bookingRef = doc(db, 'reservations', id);
      try {
        await deleteDoc(bookingRef);
        if (isPast) {
          setPastBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        } else {
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        }
      } catch (error) {
        console.error("Erro ao cancelar reserva: ", error);
      }
    }
  };


  // Verify if user is logged in before rendering the component
  if (!auth.currentUser) {
    return <RequireLogin />;
  }

  return (
    <div className="booking-main-container">
      <div className="booking-title-container">
        <h2 className="booking-title">Minhas Reservas</h2>
      </div>
      <CurrentBookings bookings={bookings} delBooking={delBooking} />
      <PastBookings bookings={pastBookings} delBooking={delBooking} />
    </div>
  )
}

export default MyBookingPage;
