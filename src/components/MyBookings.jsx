import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase';
import dayjs from 'dayjs';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
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
    <div>
      {bookings && bookings.map((booking) => (
        <div className='myBookings' key={booking.id}>
          <p>{`Reserva do ${dayjs(booking.initialTime.toDate()).format('DD/MM/YYYY HH:mm')} até ${dayjs(booking.finalTime.toDate()).format('DD/MM/YYYY HH:mm')}`}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
