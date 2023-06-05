import React from 'react';
import './App.css';
import AlarmProvider from './components/context/ContextAlarm';
import DigitalClock from './components/DigitalClock/DigitalClock';
import AlarmOption from './components/AlarmOption/AlarmOption';
import Alarms from './components/alarrms/Alarms';
import { apiUrl } from './config';

function App() {
  console.log(apiUrl);
  
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
