import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Button.css";
import dayjs from "dayjs";
import { db } from '../../Firebase.js'
import { collection, getDocs, where, Timestamp, query } from "firebase/firestore";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter)

const fetchReservations = async (selectedDate, room) => {
    const reservationRef = collection(db, "reservations");
    /* console.log('selectedDate:', selectedDate);
    console.log('room:', room);
    console.log('Timestamp:', Timestamp.fromDate(selectedDate)); */
    const q = query(
        reservationRef,
        where("date", "==", Timestamp.fromDate(selectedDate)),
        where("room", "==", room) // Busque apenas as reservas para a sala relevante
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
        const reservation = doc.data();
        const initialTime = dayjs.unix(reservation.initialTime.seconds);
        const finalTime = dayjs.unix(reservation.finalTime.seconds);
        data.push({ initialTime, finalTime });
    });
    // Ordenar as reservas por initialTime
    data.sort((a, b) => a.initialTime - b.initialTime);
    return data;
};

// TimeList is responsible for rendering the available time list
function TimeList({ initialTime, showBack, isTimeSelected, isCloseClicked, isBackClicked, selectedDate, room }) {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchAndSetReservations = async () => {
            const res = await fetchReservations(selectedDate, room); 
            /* console.log(res); */
            setReservations(res);
        };

        fetchAndSetReservations();
    }, [selectedDate, room]); 


    const getTimeList = useCallback((start, end, step) => {
        const times = [];
        const startTime = dayjs(selectedDate).startOf("day").add(start, "hour");
        const endTime = dayjs(selectedDate).startOf("day").add(end, "hour");
        const now = dayjs();

        for (let time = startTime; time <= endTime; time = time.add(step, "hour")) {
            if (time.isSame(now, 'day') && time.isBefore(now)) {
                continue;
            }

            // Verifique se o horário está dentro do intervalo de alguma reserva
            let isReserved = false;
            for (let reservation of reservations) {
                if ((time.isAfter(reservation.initialTime) || time.isSame(reservation.initialTime)) &&
                    (time.isBefore(reservation.finalTime) || time.isSame(reservation.finalTime))) {
                    isReserved = true;
                    break;
                }
            }

            if (!isReserved) {
                times.push(time.format("HH:mm"));
            }
        }

        return times;
    }, [selectedDate, reservations]);



    // it creates a starting and ending time list
    const initialTimes = useMemo(() => getTimeList(7.5, 21.5, 0.5), [getTimeList]);
    const finalTimes = useMemo(() => getTimeList(8, 22, 0.5), [getTimeList]);

    // determinates if the starting and ending time list must be showed
    const timeList = !initialTime ? initialTimes : finalTimes;

    // it filters the time list based on the selected starting time
    const filteredTimeList = timeList.filter((time) => {
        if (!initialTime) {
            return true;
        } else {
            const [hour, minutes] = time.split(":").map(Number);
            const [firstHour, firstMinutes] = initialTime.split(":").map(Number);
            const firstMinutesInHour = firstHour * 60 + firstMinutes;
            const hourInMinutes = hour * 60 + minutes;

            if (hourInMinutes <= firstMinutesInHour) {
                return false;
            }

            // Find the next reservation that starts after the selected initial time
            const nextReservation = reservations.find(reservation =>
                reservation.initialTime.isAfter(dayjs(selectedDate).startOf("day").add(firstHour, "hour").add(firstMinutes, "minute"))
            );

            // If there is a next reservation, and the current time is after the start of the next reservation, do not include it
            if (nextReservation && dayjs(selectedDate).startOf("day").add(hour, "hour").add(minutes, "minute").isAfter(nextReservation.initialTime)) {
                return false;
            }

            return true;
        }
    });


    return (
        <div className="horarios-container">
            <div className="control-wrapper">
                <button className="horarios-close" onClick={isCloseClicked}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {showBack && (
                    <button className="horarios-back" onClick={isBackClicked}>
                        Voltar
                    </button>
                )}
            </div>
            {filteredTimeList.length > 0 ? (
                filteredTimeList.map((time) => (
                    <button
                        className="horarios-time"
                        onClick={() => isTimeSelected(time)}
                        key={time}
                    >
                        {time}
                    </button>
                ))
            ) : (
                <p>Desculpe, não há mais horários disponíveis para essa data!</p>
            )}
        </div>
    );
}

export default TimeList;
