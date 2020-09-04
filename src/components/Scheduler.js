import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { DatePicker, Calendar, utils } from 'react-modern-calendar-datepicker';
import { Container, Grid, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Box } from '@material-ui/core'

function Scheduler() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [displayTimes, setDisplayTimes] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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

  const availableTimes = [
    '0600',
    '0700',
    '0800',
    '0900',
    '1000',
    '1100',
    '1200',
    '1300',
    '1400',
    '1500',
    '1600',
    '1700',
    '1800',
    '1900',
    '2000'
  ];

  // Sampling function( Fisher-yates shuffle )
function getSampleTimes (arr, size) {
  const shuffled = arr.slice(0); let i = arr.length; let temp; let index
  while (i--) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(0, size)
}

// Result of shuffle
const timeSamples = getSampleTimes(availableTimes, 10)
console.log(timeSamples)

  const handleDayChange = day => {
      setSelectedDay(day)
      setDisplayTimes(timeSamples)
    }


  const handleDisabledSelect = disabledDay => {
    alert('Please choose a different day.')
  };

  const handleClick = t => {
    console.log(t)
    setSelectedTime(t)
    setDisplayTimes(null)
  }

  const handleReset = () => {
    setSelectedDay(null)
    setSelectedTime(null)
    setDisplayTimes(null)
  }

  return (
    <Container maxWidth="sm">
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
        <Calendar
          value={selectedDay}
          onChange={handleDayChange}
          minimumDate={utils().getToday()}
          disabledDays={disabledDays}
          onDisabledDayError={handleDisabledSelect}
          colorPrimary="#0fbcf9"
          shouldHighlightWeekends
        />
        <Grid item xs={3} m={3}>
              { displayTimes ? displayTimes.sort(function(a, b) { return a - b }).map(t => (
                // Mapping and Sorting time array to display buttons
                <Box m={2}>
                  <Button onClick={() => handleClick(t)} key={'time'} variant="contained">{t}</Button>
                </Box>
              )) : ''}
            </Grid>
  </Grid>
  <h1>Date: { selectedDay ? selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year  : "Not Selected" }</h1>
  <h1>Time: { selectedTime ? selectedTime : "Not Selected" }</h1>
  <Button onClick={() => handleReset()} key="time" variant="contained">Reset</Button>
    </Container>
  );
}

export default Scheduler;
