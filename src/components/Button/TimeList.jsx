import React from "react";

function TimeList({ initialTime, finalTime, showBack, isTimeSelected, isCloseClicked, isBackClicked }) {
    const getTimeList = (start, end, step) => {
        const times = [];
        for (let hour = start; hour <= end; hour += step) {
            const wholeHour = Math.floor(hour);
            const minutes = hour === wholeHour ? "00" : "30";
            times.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
        }
        return times;
    };

    const initialTimes = getTimeList(7.5, 21.5, 0.5);
    const finalTimes = getTimeList(8, 22, 0.5);

    const timeList = !initialTime ? initialTimes : finalTimes;

    const filteredTimeList = timeList.filter((time) => {
        if (!initialTime) {
            return true;
        } else {
            const [hour, minutes] = time.split(":").map(Number);
            const [firstHour, firstMinutes] = initialTime.split(":").map(Number);
            const firstMinutesInHour = firstHour * 60 + firstMinutes;
            const hourInMinutes = hour * 60 + minutes;
            const isAfterFirstTime = hourInMinutes >= firstMinutesInHour + 30;
            return isAfterFirstTime;
        }
    });

    return (
        <div className="horarios-container">
            <div className="control-wrapper">
                <div className="label-button-wrapper">
                    <span className={`${showBack ? "hidden" : "de"}`}>De:</span>
                    <button className={`${showBack ? "hidden" : "close"}`} onClick={isCloseClicked}>
                        X
                    </button>
                </div>
                <div className="label-button-wrapper">
                    <span className={`${showBack ? "ate" : "hidden"}`}>Até:</span>
                    <button className={`${showBack ? "back" : "hidden"}`} onClick={isBackClicked}>
                        Voltar
                    </button>
                </div>
            </div>
            {filteredTimeList.map((time, index) => (
                <button className="btn-horario" key={index} onClick={() => isTimeSelected(time)}>
                    {time}
                </button>
            ))}
        </div>
    );
}

export default TimeList
