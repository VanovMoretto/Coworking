import React from "react";
import MyBookingDisplay from "../components/UserComps/MyBookingDisplay";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from "../Firebase";
import Sala from "../utils/Sala";

const About = () => {
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
      <div className="booking-container-main">
        <div className="booking-title-container">
            <h2 className="booking-title">Minhas Reservas</h2>
        </div>
        {bookings.map((booking, index) => (
            <div key={index} className="booking-box">
                <div className="booking-box-left">
                    {/* Agora usando o componente Sala para renderizar a imagem da sala */}
                    <Sala img={booking.room} />
                    <button className="alterar-button">Alterar</button>
                </div>
                <div className="booking-box-right">
                    <MyBookingDisplay booking={booking}/>
                    <button className="cancelar-button">Cancelar</button>
                </div>
            </div>
        ))}
      </div>
    )
}

export default About;
