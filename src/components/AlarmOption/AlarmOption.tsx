import React, { useContext } from "react";
import "./AlarmOption.css";
import useSelect from "../../custom-hooks/useSelect";
import { AlarmContext } from "../context/ContextAlarm";

function AlarmOption() {
  const { setAlarms, setAlarmTime } = useContext(AlarmContext)!;
  const currentDate = new Date();
  const [hours, setHours] = useSelect(currentDate.getHours().toString());
  const [minutes, setMinutes] = useSelect(currentDate.getMinutes().toString());

  const minutesNumber = Array.from(Array(60).keys());
  const hourNumber = Array.from(Array(24).keys());
  
  const setAlarm = () => {
    currentDate.setHours(parseInt(hours));
    currentDate.setMinutes(parseInt(minutes));
    setAlarmTime(currentDate);
    setAlarms((alarms)=> [
      ...alarms,
      {
        id: alarms.length + 1,
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        isActive: true,
      },
    ]);
  };

  return (
    <div className="option-Container">
      <div className={`wrapper-option`}>
        <select {...setHours}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour.toLocaleString("fr-Fr", { minimumIntegerDigits: 2 })}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes.toLocaleString("fr-Fr", { minimumIntegerDigits: 2 })}
            </option>
          ))}
        </select>
      </div>
      <button onClick={setAlarm} className={`setAlarm-btn`}>
        Set Alarm
      </button>
    </div>
  );
}

export default AlarmOption;
