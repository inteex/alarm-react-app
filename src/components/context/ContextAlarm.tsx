import React, { createContext, useEffect, useState } from "react";
import {
  addAlarmRequest,
  deleteAlarmRequest,
  getAlarmsRequest,
  updateAlarmRequest,
} from "../../api/alarm";
import { Alarm } from "../../models/alarm";

interface AlarmContextType {
  date: Date;
  alarms: Alarm[];
  ringingAlarm: Alarm | undefined;
  setRingingAlarm: React.Dispatch<React.SetStateAction<Alarm | undefined>>;
  updateAlarm: (alarm: Alarm) => Promise<void>;
  deleteAlarm: (id: number) => void;
  addAlarm: (alarm: Partial<Alarm>) => void;
}

interface Props {
  children: React.ReactNode;
}

export const AlarmContext = createContext<AlarmContextType | null>(null);

const AlarmProvider: React.FC<Props> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [ringingAlarm, setringingAlarm] = useState<Alarm | undefined>();

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
        await fetchAlarms();
      }
    } catch (error) {}
  };

  const deleteAlarm = async (id: number) => {
    try {
      await deleteAlarmRequest(id);
      await fetchAlarms();
      // unset ringingAlarm if we delet it when ringing
      if (id === ringingAlarm?.id) {
        setringingAlarm(undefined);
      }
    } catch (error) {
      console.log("Failed to delete Alarm");
    }
  };

  const updateAlarm = async (alarm: Alarm) => {
    try {
      const updatedAlarm = await updateAlarmRequest(alarm);
      await fetchAlarms();
      // unset ringingAlarm if we disactivate it when ringing
      if (updatedAlarm.id === ringingAlarm?.id && !updatedAlarm.isActive) {
        setringingAlarm(undefined);
      }
    } catch (error) {
      console.log("Failed to update Alarm");
    }
  };

  useEffect(() => {
    fetchAlarms();
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <AlarmContext.Provider
      value={{
        date,
        alarms,
        ringingAlarm,
        setRingingAlarm: setringingAlarm,
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
