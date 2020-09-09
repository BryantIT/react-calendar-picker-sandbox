import React, { useState } from 'react';
import Scheduler from './Scheduler'
// For Calendar
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import { Container, Grid, Button, Box, DialogContentText, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  // Calendar State
  const [selectedDay, setSelectedDay] = useState(null);
  const [displayTimes, setDisplayTimes] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submittedDay, setSubmittedDay] = useState(null);
  const [submittedTime, setSubmittedTime] = useState(null);
  // Dialog State
  const [open, setOpen] = useState(false);
  // Redirect
  const [redirectConfirm, setRedirectConfirm] = useState(false)

  // Mock Data for Calendar
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
    const shuffled = arr.slice(0); let i = arr.length; let temp;  let index
    while (i--) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(0, size)
  }

  // Result of shuffle
  const timeSamples = getSampleTimes(availableTimes, 6)
  console.log(timeSamples)

  // Handlers
  const handleDayChange = day => {
      setSelectedDay(day)
      setDisplayTimes(timeSamples)
    }


  const handleDisabledSelect = disabledDay => {
    alert('Please choose a different day.')
  };

  const handleTimeClick = t => {
    setSelectedTime(t)
    setDisplayTimes(null)
  }

  const handleReset = () => {
    setSelectedDay(null)
    setSelectedTime(null)
    setDisplayTimes(null)
  }

  const handleSubmit = (selectedDay, selectedTime) => {
    setSubmittedDay(selectedDay)
    setSubmittedTime(selectedTime)
    setOpen(false)
    setRedirectConfirm(true)

  }
  console.log( 'Day:' + submittedDay)
  console.log( 'Time:' + submittedTime)



  // Dialog Start
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    redirectConfirm ?
    <div>
      <h1>Thank you for scheduling an assessment</h1>
      <h2>Your scheduled assessment time is below</h2>
      <p>{submittedDay.day}/{submittedDay.month}/{submittedDay.year} at: {submittedTime}</p>
    </div>
    :
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Schedule your assessment
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Language Assessment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
                          <Button onClick={() => handleTimeClick(t)} key={'time'} variant="contained">{t}</Button>
                        </Box>
                      )) : ''}
                    </Grid>
          </Grid>
          <h1>Date: { selectedDay ? selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year  : "Not Selected" }</h1>
          <h1>Time: { selectedTime ? selectedTime : "Not Selected" }</h1>
          <Button onClick={() => handleSubmit(selectedDay, selectedTime)} key="time" variant="contained">Submit</Button>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
