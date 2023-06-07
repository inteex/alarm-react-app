import React, { useContext } from "react";
import "./AlarmOption.css";
import useSelect from "../../custom-hooks/useSelect";
import { AlarmContext } from "../context/ContextAlarm";

export const formatTo2Digits = (value: number) =>
  value.toLocaleString("fr-Fr", { minimumIntegerDigits: 2 });

function AlarmOption() {
  const { addAlarm } = useContext(AlarmContext)!;

  const currentDate = new Date();
  const [hours, setHours] = useSelect(currentDate.getHours().toString());
  const [minutes, setMinutes] = useSelect(currentDate.getMinutes().toString());

  const minutesNumber = Array.from(Array(60).keys());
  const hourNumber = Array.from(Array(24).keys());

  const setAlarm = () => {
    addAlarm({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
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
            <option key={index} value={hour}>
              {formatTo2Digits(hour)}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {formatTo2Digits(minutes)}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn`}
        data-testid="set-alarm"
      >
        Ajouter une alarme
      </button>
    </div>
  );
}

export default AlarmOption;
