import React, { useState } from 'react'
import MomentUtils from '@date-io/moment'
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DateTimePicker
        } from '@material-ui/pickers'
import moment from 'moment'


function MaterialPicker() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date())

  const handleDayChange = day => {
      setSelectedDay(day)
      console.log(selectedDay)
    }

function disabledDays() {
  const disabledDaysArray = [
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
  return disabledDaysArray
}


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        disablePast
        variant="static"
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDays={disabledDays}
      />
      <TimePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>


  )
}

export default MaterialPicker
