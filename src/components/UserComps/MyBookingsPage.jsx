import React, { useEffect } from "react";
import MyBookingDisplay from "./MyBookingDisplay";
import RequireLogin from "../../utils/RequireLogin";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Firebase';
import dayjs from 'dayjs';
import Sala from '../../utils/Sala';
import '../../Styles/BookingPage.css'

const MyBookingPage = () => {
  const [bookings, setBookings] = React.useState([]);
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
    
          // Ordena as reservas por horário de início
          const sortedBookings = fetchedBookings.sort((a, b) => {
            return dayjs(a.initialTime.toDate()).isAfter(dayjs(b.initialTime.toDate())) ? 1 : -1;
          });
    
          setBookings(sortedBookings);
        }
      };
    
      fetchBookings();
    }
    
  }, [auth, navigate]);

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
  
  
// Verify if user is logged in before rendering the component
if (!auth.currentUser) {
  return <RequireLogin />;
}

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
