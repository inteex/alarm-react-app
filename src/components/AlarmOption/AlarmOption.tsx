import React, { useContext } from "react";
import "./AlarmOption.css";
import useSelect from "../../custom-hooks/useSelect";
import { AlarmContext } from "../context/ContextAlarm";

function AlarmOption() {
  const { addAlarm } = useContext(AlarmContext)!;

  const formatTo2Digits = (value: number) =>
    value.toLocaleString("fr-Fr", { minimumIntegerDigits: 2 });

  const currentDate = new Date();
  const [hours, setHours] = useSelect(formatTo2Digits(currentDate.getHours()));
  const [minutes, setMinutes] = useSelect(
    formatTo2Digits(currentDate.getMinutes())
  );

  const minutesNumber = Array.from(Array(60).keys());
  const hourNumber = Array.from(Array(24).keys());

  const setAlarm = () => {
    addAlarm({
      hours: hours,
      minutes: minutes,
      isActive: true,
    });
  };

  return (
    <div className="option-Container">
      <div className={`wrapper-option`}>
        <select {...setHours}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={formatTo2Digits(hour)}>
              {formatTo2Digits(hour)}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={formatTo2Digits(minutes)}>
              {formatTo2Digits(minutes)}
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
