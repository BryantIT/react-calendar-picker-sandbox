import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
import Dialog from './components/Dialog'
import MaterialPicker from './components/MaterialPicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { DatePicker, Calendar, utils } from 'react-modern-calendar-datepicker';
import { Container, Grid, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Box } from '@material-ui/core'

function App() {

  return (
    <MaterialPicker />
  )

}

export default App;
