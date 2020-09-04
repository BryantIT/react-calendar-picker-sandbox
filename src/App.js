import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { DatePicker, Calendar, utils } from 'react-modern-calendar-datepicker';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  console.log(selectedDay)

  const disabledDays = [
    {
      year: 2020,
      month: 9,
      day: 20,
    },
    {
      year: 2020,
      month: 9,
      day: 21,
    },
    {
      year: 2020,
      month: 9,
      day: 7,
    }
  ];

  const handleDisabledSelect = disabledDay => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  return (
    <div>
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        minimumDate={utils().getToday()}
        disabledDays={disabledDays}
        onDisabledDayError={handleDisabledSelect}
        colorPrimary="#0fbcf9"
        shouldHighlightWeekends
      />
    <h1>Date: { selectedDay ? selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year  : "Not Selected" }</h1>
    </div>
  );
}

export default App;
