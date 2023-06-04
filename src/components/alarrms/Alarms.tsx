import React, { useContext, useEffect } from "react";
import "./Alarms.css";
import useSelect from "../../custom-hooks/useSelect";
import { AlarmContext } from "../context/ContextAlarm";
import { Alarm } from "../../models/alarm";
import useFetch from "../../custom-hooks/useFetch";

function Alarms() {
  const { alarms, toggleDisableAlarm, deleteAlarm, setAlarms } =
    useContext(AlarmContext)!;
  const { loading, error, value } = useFetch<Alarm[]>("http://127.0.0.1:3001/alarms");

  if (value) {
    setAlarms(value);
  }

  return (
    <div className="alarm-contianer">
      {alarms.map((alarm, index) => (
        <div key={index} className="toggle-switch">
          <p>{`${alarm.hours}:${alarm.minutes}`}</p>
          <div className="flex">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => toggleDisableAlarm(alarm.id)}
              checked={alarm.isActive}
            />
            <button onClick={() => deleteAlarm(alarm.id)}> X </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Alarms;
