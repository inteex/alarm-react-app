import React, { useContext } from "react";
import "./DigitalClock.css";
import { AlarmContext } from "../context/ContextAlarm";

function DigitalClock() {
  const { date } =
    useContext(AlarmContext)!;


  return (
    <div>
      <div className="clock__text">
        <p className="time">
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
          })}
        </p>

      </div>

      <div className="clock__date" data-testid="today-date">
        {date.toLocaleDateString("fr")}
      </div>
    </div>
  );
}

export default DigitalClock;
