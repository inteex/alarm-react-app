import React from "react";
import "./App.css";
import AlarmProvider from "./components/context/ContextAlarm";
import DigitalClock from "./components/DigitalClock/DigitalClock";
import AlarmOption from "./components/AlarmOption/AlarmOption";
import Alarms from "./components/alarrms/Alarms";
function App() {
  return (
    <section className="container">
      <AlarmProvider>
        <DigitalClock />
        <AlarmOption />
        <Alarms />
      </AlarmProvider>
    </section>
  );
}

export default App;
