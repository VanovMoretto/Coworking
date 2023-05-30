import dayjs from 'dayjs';

const MyBookingDisplay = ({ booking }) => {
  return (
    <div className='booking-display'>
      <p className='booking-roomName'>Sala de reuniões: {booking.room}</p>
      <p className='booking-day'>Dia: {dayjs(booking.initialTime.toDate()).format('DD/MM/YYYY')}</p>
      <p className='booking-time'>{`Horário: ${dayjs(booking.initialTime.toDate()).format('HH:mm')} até ${dayjs(booking.finalTime.toDate()).format('HH:mm')}`}</p>
    </div>
  );
};

const PastBookingDisplay = ({ booking }) => {
  return (
    <div className='past-booking-display'>
      <p className='past-roomName'><strong>Local:</strong> {booking.room} -</p>
      <p className='past-day'>&nbsp;<strong>Dia:</strong> {dayjs(booking.initialTime.toDate()).format('DD/MM/YYYY')}</p>
      <p className='past-time'>&nbsp;- {`${dayjs(booking.initialTime.toDate()).format('HH:mm')}`}<strong> até </strong>{`${dayjs(booking.finalTime.toDate()).format('HH:mm')}`}</p>
    </div>
  );
};

export { MyBookingDisplay, PastBookingDisplay };
