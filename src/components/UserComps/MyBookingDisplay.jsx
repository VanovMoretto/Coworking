import dayjs from 'dayjs';

const MyBookingDisplay = ({ booking }) => {
  return (
    <div className='booking-display'>
      <p className='booking-roomName'>Sala de reuniões: {booking.room}</p>
      <p className='booking-day'>Dia: {dayjs(booking.initialTime.toDate()).format('DD/MM/YYYY')}</p>
      <p className='booking-time'>{`Reserva das ${dayjs(booking.initialTime.toDate()).format('HH:mm')} até ${dayjs(booking.finalTime.toDate()).format('HH:mm')}`}</p>
    </div>
  );
};

export default MyBookingDisplay;
