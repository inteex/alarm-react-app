import { render, screen } from "@testing-library/react";
import Alarms from "../alarrms/Alarms";
import { AlarmContext, AlarmContextType } from "../context/ContextAlarm";

const alarmContextMock: AlarmContextType = {
  date: new Date(),
  alarms: [
    {
      id: 1,
      hours: "21",
      minutes: "53",
      isActive: true,
    },
  ],
  ringingAlarm: undefined,
  setRingingAlarm: () => {},
  updateAlarm: () => Promise.resolve(),
  deleteAlarm: () => {},
  addAlarm: () => {},
};

test("renders alarm correctly", async () => {
  render(
    <AlarmContext.Provider value={alarmContextMock}>
      <Alarms />
    </AlarmContext.Provider>
  );
  const alarmText = screen.getByText(`21:53`);

  expect(alarmText).toBeInTheDocument();
});
