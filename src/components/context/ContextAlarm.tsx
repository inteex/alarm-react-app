import React, { createContext, useEffect, useState } from "react";
import {
  addAlarmRequest,
  deleteAlarmRequest,
  getAlarmsRequest,
  updateAlarmRequest,
} from "../../api/alarm";
import useFetch from "../../custom-hooks/useFetch";
import months from "../../data";
import { Alarm } from "../../models/alarm";
// import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";

interface AlarmContextType {
  date: Date;
  alarms: Alarm[];
  updateAlarm: (alarm: Alarm) => void;
  deleteAlarm: (id: number) => void;
  addAlarm: (alarm: Partial<Alarm>) => void;
}

interface Props {
  children: React.ReactNode;
}

// const alarm = new Audio(Sound);
export const AlarmContext = createContext<AlarmContextType | null>(null);

const AlarmProvider: React.FC<Props> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const fetchAlarms = async () => {
    try {
      const alarms: Alarm[] = await getAlarmsRequest();
      setAlarms(alarms);
    } catch (error) {
      console.log({ error });
    }
  };

  const addAlarm = async (alarm: Partial<Alarm>) => {
    try {
      const alarmResponse: Alarm = await addAlarmRequest(alarm);
      if (alarmResponse) {
        fetchAlarms();
      }
    } catch (error) {}
  };

  const deleteAlarm = async (id: number) => {
    try {
      await deleteAlarmRequest(id);
      fetchAlarms();
    } catch (error) {
      console.log("Failed to delete Alarm");
    }
  };

  const updateAlarm = async (alarm: Alarm) => {
    try {
      await updateAlarmRequest(alarm);
      fetchAlarms();
    } catch (error) {
      console.log("Failed to update Alarm");
    }
  };

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    fetchAlarms();
  }, []);

  useEffect(() => {
    const alarmToRing =
      alarms &&
      alarms.find(
        (alarm) =>
          alarm.isActive &&
          date.getHours().toString() === alarm.hours &&
          date.getMinutes().toString() === alarm.minutes
      );
    if (alarmToRing) {
      updateAlarm(alarmToRing);
      alert("ringing");
    }
  }, [alarms]);


  return (
    <AlarmContext.Provider
      value={{
        date,
        alarms,
        updateAlarm,
        deleteAlarm,
        addAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export default AlarmProvider;
