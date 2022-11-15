// import styles from './Calendar.module.scss';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from '@fullcalendar/interaction'
// import * as React from 'react';
// import { useState, useEffect } from 'react'
// import { ICalendar } from './IStates';
// import {
//   Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, Grid, AppBar, Toolbar, Typography, Divider
//   } from '@material-ui/core';
// import DisplayCalendar from './DisplayCalendar';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
//   KeyboardTimePicker,
// } from '@material-ui/pickers';

// import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';

// const Calendar = ({ context }) => {
//   const [calendars, setCalendars] = useState<ICalendar[]>([])
//   const [isDateClickDialogOpen, setIsDateClickDialogOpen] = useState<boolean>(false)
//   const [isEventClickDialogOpen, setIsEventClickDialogOpen] = useState<boolean>(false)
//   const [name, setName] = useState<string>('')
//   const [selection, setSelection] = useState<string>('Half')
//   const [startTime, setStartTime] = useState<Date | null>(null)
//   const [endTime, setEndTime] = useState<Date | null>(null)
//   const [isFullDay, setIsFullDay] = useState<boolean>(false)
//   const [isEditing, setIsEditing] = useState<boolean>(false)
//   const [id, setID] = useState<number | null>(null)

//   useEffect(() => {
//     sp.setup({ spfxContext: context})
//     _getEvents()
//   },[])
//   const _getEvent = async (id: number) => {
//     const calendarRes = await sp.web.lists.getByTitle('Out Of Office').items.getById(id).get()
//     return calendarRes
//   }
//   const _getEvents = async () => {
//     const calendarsRes = await sp.web.lists.getByTitle('Out Of Office').items.get()
//     const calendars = calendarsRes.map(calendar => ({
//       ...calendar,
//       id: calendar.ID,
//       title: calendar.Title,
//       start: calendar.StartDate,
//       end: calendar.EndDate,
//       allDay: calendar.IsAllDay,
//     }))
//     setCalendars(calendars)
//   }
//   const _handleClose = () => {
//     setIsDateClickDialogOpen(false)
//     setIsEventClickDialogOpen(false)
//   };
//   const _handleSubmit = async () => {
//     const calendarItem = await sp.web.lists.getByTitle('Out Of Office').items.add({
//       Title: name,
//       StartDate: startTime,
//       EndDate: endTime,
//       IsAllDay: isFullDay,
//       Selection: selection
//     })
//     setIsDateClickDialogOpen(false)
//     setIsEventClickDialogOpen(false)
//     _getEvents()
//   }
//   const _handleDelete = async () => {
//     await sp.web.lists.getByTitle('Out Of Office').items.getById(id).delete()
//     setIsDateClickDialogOpen(false)
//     setIsEventClickDialogOpen(false)
//     _getEvents()
//   }
//   const _handleUpdate = async () => {
//     const calendarItem = await sp.web.lists.getByTitle('Out Of Office').items.getById(id).update({
//       Title: name,
//       StartDate: startTime,
//       EndDate: endTime,
//       IsAllDay: isFullDay,
//       Selection: selection
//     })
//     console.log(calendarItem)
//     setIsDateClickDialogOpen(false)
//     setIsEventClickDialogOpen(false)
//     _getEvents()
//   }
//   const _handleNameChange = (e) => {
//     setName(e.target.value)
//   }
//   const _handleStartTime = (date) => {
//     setStartTime(date)
//   }
//   const _handleEndTime = (date) => {
//     if(selection === "Multiple") {
//       // setEndTime(new Date(date.toISOString().split('T')[0] + 'T23:59:00.000Z'))
//       date.setDate(date.getDate() + 1)
//       setEndTime(date)
//       return
//     }
//     setEndTime(date)
//   }
//   const _handleIsFullDay = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if(e.target.value === 'Half') {
//       setEndTime(startTime)
//       setIsFullDay(false)
//       setSelection('Half')
//       return
//     }
//     if(e.target.value === 'Single') {
//       setEndTime(startTime)
//       setIsFullDay(true)
//       setSelection('Single')
//       return
//     }
//     if(e.target.value === 'Multiple') {
//       setIsFullDay(true)
//       setSelection('Multiple')
//       return
//     }
//   }
//   return(
//     <div>
//       <Dialog open={isDateClickDialogOpen} onClose={_handleClose} aria-labelledby="form-dialog-title">
//         <AppBar position="static" style={{ marginBottom: '1em' }}>
//           <Toolbar variant="dense">
//             <Typography variant="h6" color="inherit" component="div">
//               OUT OF OFFICE SUBMISSION
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField style={{ width: '100%' }} value={name} label="Name" variant="outlined" onChange={_handleNameChange}/>
//             </Grid>
//             <Grid item xs={12}>
//               <RadioGroup row aria-label="calendarForm" value={selection} name="radio-buttons-group" onChange={ _handleIsFullDay }>
//                 <FormControlLabel value="Half" control={<Radio />} label="Half Day" />
//                 <FormControlLabel value="Single" control={<Radio />} label="Single Day" />
//                 <FormControlLabel value="Multiple" control={<Radio />} label="Multiple Day" />
//               </RadioGroup>
//             </Grid>
//             { selection === 'Half' &&
//             <Grid item xs={12}>
//               <Grid container>
//                 <Grid item xs={6}>
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardTimePicker
//                       ampm={false}
//                       autoOk
//                       variant="inline"
//                       label="Start Time"
//                       value={startTime}
//                       onChange={_handleStartTime}
//                     />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardTimePicker
//                       ampm={false}
//                       autoOk
//                       variant="inline"
//                       label="End Time"
//                       value={endTime}
//                       onChange={_handleEndTime}
//                     />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//               </Grid>
//             </Grid>
//             }
//             { selection === 'Single' &&
//             <Grid item xs={12}>
//               <Grid container>
//                 <Grid item xs={6} >
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                   <KeyboardDatePicker
//                     autoOk
//                     disableToolbar
//                     variant="inline"
//                     format="MM/dd/yyyy"
//                     disablePast
//                     id="date-picker-inline"
//                     label="Date"
//                     value={startTime}
//                     onChange={_handleStartTime}
//                   />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//               </Grid>
//             </Grid>
//             }
//             { selection === 'Multiple' &&
//             <Grid item xs={12}>
//               <Grid container>
//                 <Grid item xs={6} >
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardDatePicker
//                       autoOk
//                       disableToolbar
//                       variant="inline"
//                       format="MM/dd/yyyy"
//                       disablePast
//                       id="date-picker-inline"
//                       label="Start Time"
//                       value={startTime}
//                       onChange={_handleStartTime}
//                     />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//                 <Grid item xs={6} >
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardDatePicker
//                       autoOk
//                       disableToolbar
//                       variant="inline"
//                       format="MM/dd/yyyy"
//                       id="date-picker-inline"
//                       disablePast
//                       label="End Time"
//                       value={endTime}
//                       onChange={_handleEndTime}
//                     />
//                   </MuiPickersUtilsProvider>
//                 </Grid>
//               </Grid>
//             </Grid>
//             }
//           </Grid>
//         </DialogContent>
//         <Divider style={{ marginTop: '1em' }} />
//         <DialogActions>
//           { isEditing === false &&
//             <Button onClick={_handleSubmit} color="primary" disabled={name === ''}>
//               SUBMIT
//             </Button>
//           }
//           { isEditing === true &&
//             <Button onClick={_handleUpdate} color="primary" disabled={name === ''}>
//               UPDATE
//             </Button>
//           }
//           { isEditing === true &&
//           <Button onClick={_handleDelete} color="primary" >
//             DELETE
//           </Button>
//           }
//           <Button onClick={_handleClose} color="primary">
//             CANCEL
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog fullWidth={true} maxWidth={'xl'} open={isEventClickDialogOpen} onClose={_handleClose} >
//         <DialogTitle>OUT OF OFFICE CALENDAR</DialogTitle>
//         <DialogContent>
//           <FullCalendar
//             initialView="dayGridMonth"
//             plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             editable={true}
//             displayEventEnd={true}
//             themeSystem="standard"
//             headerToolbar={{
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}
//             events={ calendars }
//             eventClick={ (info) => {
//               setIsEditing(true)
//               setIsDateClickDialogOpen(true)
//               setStartTime(info.event.start)
//               setEndTime(info.event.end)
//               setName(info.event.title)
//               setID(Number(info.event.id))
//               _getEvent(Number(info.event.id)).then((item: any) => setSelection(item.Selection))
//             }}
//             dateClick={ (info) => {
//               setStartTime(info.date)
//               setEndTime(info.date)
//               setIsDateClickDialogOpen(true)
//             }}   
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={_handleClose} color="primary">
//             CLOSE
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <DateTimePicker label="DateTime Picker - 12h"
//                 dateConvention={DateConvention.DateTime}
//                 timeConvention={TimeConvention.Hours12} />
//       <FullCalendar
//         initialView="dayGridMonth"
//         plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         editable={true}
//         displayEventEnd={true}
//         themeSystem="standard"
//         headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         }}
//         events={ calendars }
//         eventClick={ (info) => {
//           setIsEventClickDialogOpen(true)
//         }}
//         dateClick={ (info) => {
//           setStartTime(info.date)
//           setEndTime(info.date)
//           setIsDateClickDialogOpen(true)
//         }}   
//       />
//     </div>
//   )
// }

// export default Calendar