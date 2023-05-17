import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../Firebase';
import dayjs from 'dayjs';

const About = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async (user) => {
            if (user) {
                const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                setBookings(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                console.log('usuário:', user)
            }
        };

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, fetchBookings);

        return () => unsubscribe(); // Limpar na desmontagem
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

export default About;

