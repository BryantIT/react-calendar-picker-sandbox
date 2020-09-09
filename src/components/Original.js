import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { useRemoteConfig } from '../../provider/RemoteConfig'
// material ui
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Container, Grid, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Box } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import DateFnsUtils from '@date-io/date-fns'

// Available Time Mock Data
const availableTimes = [
  '0800',
  '1000',
  '1200',
  '1400',
  '1600',
  '1800',
  '2000'
]

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
const timeSamples = getSampleTimes(availableTimes, 5)
console.log(timeSamples)

const useStyles = makeStyles((theme) => {
  return ({
    timeSlotSelected: {
      backgroundColor: theme.palette.success.main
    },
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: 'inherit'
    },
    selectedDate: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    highlight: {
      background: theme.palette.success.main,
      color: theme.palette.common.white
    },
    nonCurrentMonth: {
      color: theme.palette.text.disabled
    }
  })
})

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

async function getEvents (url) {
  const { data } = await axios.get(url)
  return data ? data.items : []
}

export default function AssessmentSchedulePage () {
  const [selectedDays, setSelectedDays] = React.useState([1, 2, 15])
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedTimeSlot, setselectedTimeSlot] = React.useState({})
  const classes = useStyles()

  const remoteConfig = useRemoteConfig()
  const router = useRouter()
  const { courseId } = router.query
  const { data: events } = useSWR(() => `${remoteConfig['scheduling-service-url']}/api/appointment`, getEvents, { shouldRetryOnError: false })

  let timeSlotList
  if (events) {
    timeSlotList = <List >
      {
        events.map((event) => {
          const startDate = DateTime.fromISO(event.start.dateTime, { zone: event.start.timeZone })
          const endDate = DateTime.fromISO(event.end.dateTime, { zone: event.end.timeZone })
          return (
            <ListItem button key={event.id} onClick={() => setselectedTimeSlot(event)}>
              <ListItemAvatar>
                <Avatar className={selectedTimeSlot.id === event.id ? classes.timeSlotSelected : ''}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={event.description} secondary={`${startDate.toFormat('hh:mm')}-${endDate.toFormat('hh:mm')}`} />
            </ListItem>
          )
        })
      }
    </List>
  } else {
    timeSlotList = <p>Loading</p>
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)))
        resolve()
      }, 1000)
    })
  }

  return (
    <Container component="main">
      <h1>Schedule an assessment</h1>

      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
        <Grid item >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="static"
              disablePast
              value={selectedDate}
              onMonthChange={handleMonthChange}
              onChange={handleDateChange}
              renderDay={(date, selectedDate, isInCurrentMonth, dayComponent) => {
                const hasSpots = isInCurrentMonth && selectedDays.includes(date.getDate())
                const isSelectedDate = selectedDate.getDate() === date.getDate()

                const dayClassName = [
                  classes.day,
                  hasSpots && !isSelectedDate ? classes.highlight : '',
                  isSelectedDate && isInCurrentMonth ? classes.selectedDate : '',
                  !isInCurrentMonth ? classes.nonCurrentMonth : ''
                ].join(' ')

                return <IconButton className={dayClassName}>{date.getDate()}</IconButton>
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item >
          { events ? timeSlotList : <p>no events</p>}
        </Grid>
        <Grid item xs={3} m={3}>
          {timeSamples.sort(function(a, b) { return a - b }).map(t => (
            // Mapping and Sorting time array to display buttons
            <Box m={2} onClick={() => console.log(t)}>
              <Button key="time" variant="contained">{t}</Button>
            </Box>
          ))}
        </Grid>
        <Grid item container justify="center" xs={12}>
          <Button variant="contained" color="primary" onClick={() => router.push({ pathname: '/assessment/written', query: { courseId } })}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Container>

  )
}
