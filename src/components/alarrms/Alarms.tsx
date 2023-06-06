import { useContext, useEffect, useState } from "react";
import "./Alarms.css";
import { AlarmContext } from "../context/ContextAlarm";
import { FiTrash2 } from "react-icons/fi";
import Modal from "../modal/modal";
// @ts-ignore
import SoundFile from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";
import { Alarm } from "../../models/alarm";

const audio = new Audio(SoundFile);

function Alarms() {
  const {
    ringingAlarm,
    date,
    alarms,
    updateAlarm,
    deleteAlarm,
    setRingingAlarm,
  } = useContext(AlarmContext)!;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const alarmToRing =
      alarms &&
      alarms.find(
        (alarm) =>
          alarm.isActive &&
          !ringingAlarm &&
          date.getHours() === parseInt(alarm.hours) &&
          date.getMinutes() === parseInt(alarm.minutes)
      );
    if (alarmToRing) {
      openModal();
      setRingingAlarm(alarmToRing);
      audio.play();
      audio.loop = true;
    }
  }, [date, alarms]);

  const onConfirm = async () => {
    toggleAlarm(ringingAlarm!);
    closeModal();
  };

  const toggleAlarm = (alarm: Alarm): Promise<void> => {
    ringingAlarm?.id === alarm.id && stopAlarm();
    return updateAlarm({
      ...alarm,
      isActive: !alarm.isActive,
    });
  };

  const deleteButton = (id: number) => {
    ringingAlarm?.id === id && stopAlarm();
    deleteAlarm(id);
  };

  const stopAlarm = () => {
    audio.pause();
  };

  return (
    <div className="alarm-contianer">
      {alarms.map((alarm, index) => (
        <div key={index} className="toggle-switch">
          <p>{`${alarm.hours}:${alarm.minutes}`}</p>
          <div className="flex toggle-delete-container">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => toggleAlarm(alarm)}
              checked={alarm.isActive}
            />
            <button
              className="delete-button"
              onClick={() => deleteButton(alarm.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={onConfirm}>
        <p>{`Il est ${ringingAlarm?.hours}:${ringingAlarm?.minutes}`}</p>
      </Modal>
    </div>
  );
}

export default Alarms;
