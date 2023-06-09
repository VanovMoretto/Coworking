import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfWeek, addDays, subDays, isBefore, isToday, isAfter } from 'date-fns';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './Dates.css'
import { ptBR } from 'date-fns/locale';

const Dates = ({ onDateSelected }) => {

    // Helper function to check if the current time is after the last booking time for the day
    const isAfterTime = useCallback((day) => {
        const lastBookingTime = new Date(day);
        lastBookingTime.setHours(21, 30, 0, 0);

        return isToday(day) && isAfter(new Date(), lastBookingTime);
    }, []);

    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(isAfterTime(today) ? null : today);

    useEffect(() => {
        onDateSelected(selectedDay);
    }, [selectedDay, onDateSelected]);


    const isDaySelected = (day) => {
        setSelectedDay(day);
        onDateSelected(day)
    };



    // State for storing the week days
    const [weekDays, setWeekDays] = useState([]);

    // Helper function to check if a given week is the current week or later
    const isCurrentWeekOrAfter = (date) => {
        const today = new Date();
        const startOfDefaultWeek = startOfWeek(today, { locale: ptBR });
        return date >= startOfDefaultWeek;
    };

    // Calculate the initial week and the days in the initial week
    const initialWeek = startOfWeek(new Date(), { locale: ptBR });
    const daysInInitialWeek = Array.from({ length: 7 }, (_, i) => addDays(initialWeek, i));

    // Helper function to check if all days in a week are unavailable
    const areDaysAvaliable = useCallback((days) => {
        return days.every((day) => (isBefore(day, new Date()) && !isToday(day)) || isAfterTime(day));
    }, [isAfterTime]);

    // State for storing the current week
    const [currentWeek, setCurrentWeek] = useState(
        areDaysAvaliable(daysInInitialWeek) ? addDays(initialWeek, 7) : initialWeek
    );

    // Function to move to the previous week
    const previousWeek = () => {
        setCurrentWeek(subDays(currentWeek, 7));
    };

    const isBackArrowDisabled = useCallback(() => {
        const previousWeekStartDate = subDays(currentWeek, 7);
        const defaultWeekStartDate = startOfWeek(new Date(), { locale: ptBR });

        if (isAfterTime(previousWeekStartDate) || isAfterTime(defaultWeekStartDate)) {
            return true;
        }

        if (isBefore(previousWeekStartDate, defaultWeekStartDate)) {
            return true;
        }

        return false;
    }, [currentWeek, isAfterTime]);

    // Update the week days when the current week changes
    useEffect(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(addDays(currentWeek, i));
        }
        setWeekDays(days);
        setNoBackArrow(isBackArrowDisabled());

        // Select the first available day of the new week
        const firstAvailableDay = days.find(day => !(isBefore(day, new Date()) && !isToday(day)) && !isAfterTime(day));

        if (firstAvailableDay) {
            setSelectedDay(firstAvailableDay);
        }
    }, [currentWeek, isAfterTime, isBackArrowDisabled]);

    // Function to move to the next week
    const nextWeek = () => {
        setCurrentWeek(addDays(currentWeek, 7));
    };

    // State to disable the previous arrow when there are no available days in the current week
    const [noBackArrow, setNoBackArrow] = useState(isCurrentWeekOrAfter(subDays(currentWeek, 7)));


    const isTouchOn = (e) => {
        e.target.classList.add("touched");
        setTimeout(() => {
            e.target.classList.remove("touched");
        }, 200);
    };

    const formatDateAsString = (date) => {
        return format(date, 'yyyy-MM-dd');
    };

    // Render the week date picker component
    return (
        <div className="week-date-picker">
            <button
                className={`left-arrow${(!isCurrentWeekOrAfter(subDays(currentWeek, 7)) || noBackArrow) ? ' off' : ''}`}
                onClick={previousWeek}
                disabled={!isCurrentWeekOrAfter(subDays(currentWeek, 7)) || noBackArrow}
                aria-label='previous week' onTouchStart={isTouchOn}>
                <ArrowBackIos />
            </button>
            {weekDays.map((day, index) => (
                <button
                    key={index}
                    className={`week-container ${(isBefore(day, new Date()) && !isToday(day)) || isAfterTime(day)
                        ? "disabled-day"
                        : ""
                        } ${formatDateAsString(selectedDay) === formatDateAsString(day) ? "selected-day" : ""}`}
                    onClick={() => isDaySelected(day)}
                >
                    <span className="year">{format(day, 'yyyy')}</span>
                    <span className="month" >{format(day, 'MMM')}</span>
                    <span className="day">{format(day, 'dd')}</span>
                </button>
            ))}

            <button className="right-arrow" onClick={nextWeek} aria-label='next week' onTouchStart={isTouchOn}>
                <ArrowForwardIos />
            </button>
        </div>
    );
};

export default Dates;