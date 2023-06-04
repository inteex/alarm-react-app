import React, { createContext, useEffect, useState } from "react";
import useFetch from "../../custom-hooks/useFetch";
import months from "../../data";
import { Alarm } from "../../models/alarm";
// import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";

interface AlarmContextType {
  date: Date;
  alarmTime: Date | undefined;
  alarms: Alarm[];
  setAlarmTime: (data: Date) => void;
  toggleDisableAlarm: (id: number) => void;
  deleteAlarm: (id: number) => void;
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
}

interface Props {
  children: React.ReactNode;
}

// const alarm = new Audio(Sound);
export const AlarmContext = createContext<AlarmContextType | null>(null);

const AlarmProvider: React.FC<Props> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [alarmTime, setAlarmTime] = useState<Date>();

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
    setAlarms((alarms) => alarms);
  }, []);

  useEffect(() => {
    const alarmToRing = alarms.find(
      (alarm) =>
        alarm.isActive &&
        date.getHours() === alarm.hours &&
        date.getMinutes() === alarm.minutes
    );
    if (alarmToRing) {
      toggleDisableAlarm(alarmToRing.id);
      alert("ringing");
    }
  }, [date]);

  const toggleDisableAlarm = (id: number) =>
    setAlarms((existingAlarms) =>
      existingAlarms.map((alarm) => {
        if (alarm.id === id) {
          return {
            ...alarm,
            isActive: !alarm.isActive,
          };
        }
        return alarm;
      })
    );

  const deleteAlarm = (id: number) =>
    setAlarms((existingAlarms) =>
      existingAlarms.filter((alarm) => alarm.id !== id)
    );

  return (
    <AlarmContext.Provider
      value={{
        date,
        alarmTime,
        alarms,
        setAlarmTime,
        toggleDisableAlarm,
        deleteAlarm,
        setAlarms,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export default AlarmProvider;
