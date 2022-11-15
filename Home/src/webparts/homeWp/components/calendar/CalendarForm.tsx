// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
// import Button from '@material-ui/core/Button';
// import { Dialog, Radio, RadioGroup } from '@material-ui/core';
// import { FormControlLabel } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// const steps = [ {label: 'Select your option'}, {label: 'Pick your date (time)'}, {label: 'Summary '}];

// const CalendarForm = () => {
//   const [activeStep, setActiveStep] = useState<number>(0);
//   const [name, setName] = useState<string>('')
//   const [selection, setSelection] = useState<string>('')
//   const [disabled, setDisabled] = useState<boolean>(true)
//   const [isDatePicked, setIsDatePicked] = useState<boolean>(false)
//   const [startTime, setStartTime] = useState<Date | null>(new Date())
//   const [endTime, setEndTime] = useState<Date | null>(new Date())
//   const [date, setDate] = useState<Date | null>(new Date())
//   const [isConfirmed, setConfirmed] = useState<boolean>(false)

//   useEffect(() => {

//   }, [])



//   const _handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const _handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//   const _handleIsFullDay = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDisabled(false)
//     if(e.target.value === 'half') {
//       setSelection('half')
//       return
//     }
//     if(e.target.value === 'single') {
//       setSelection('single')
//       return
//     }
//     if(e.target.value === 'multiple') {
//       setSelection('multiple')
//       return
//     }
//   }
//   const _handleDateChange = (date: any) => {
//     if(selection === 'half') {
//       setIsDatePicked(true)
//       setStartTime(date)
//       setEndTime(date)
//     }  
//   }
//   const _handleStartTime = (date) => {
//     console.log(date)
//     setStartTime(date)
//   }
//   const _handleEndTime = (date) => {
//     console.log(date)
//     setEndTime(date)
//   }
//   const _handleNameChange = (e) => {
//     console.log(e.target.value)
//     setName(e.target.value)
//   }
//   const _handleConfirm = () => {

//   }
//   return (
//     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here. We
//             will send updates occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Subscribe</Button>
//         </DialogActions>
//       </Dialog>
//   );
// }

// export default CalendarForm

// {/* <Stepper activeStep={activeStep} orientation="vertical" style={{ width: '50%' }}>
// {steps.map((step, index) => (
//   <Step key={step.label}>
//     <StepLabel>{step.label}</StepLabel>
//     <StepContent>
//       { index === 0 &&
//         <RadioGroup aria-label="calendarForm" value={selection} name="radio-buttons-group" onChange={ _handleIsFullDay }>
//           <FormControlLabel value="half" control={<Radio />} label="Half Day" />
//           <FormControlLabel value="single" control={<Radio />} label="Single Day" />
//           <FormControlLabel value="multiple" control={<Radio />} label="Multiple Day" />
//         </RadioGroup>
//       }
//       {
//         index === 1 &&
//         <div>
//           <TextField id="outlined-basic" value={name} label="Name" variant="outlined" onChange={_handleNameChange}/>
//           { selection === 'half' && 
//           <div>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                   <KeyboardDatePicker
//                     autoOk
//                     disableToolbar
//                     variant="inline"
//                     format="MM/dd/yyyy"
//                     margin="normal"
//                     id="date-picker-inline"
//                     label="Date picker inline"
//                     value={date}
//                     onChange={_handleDateChange}
//                     KeyboardButtonProps={{
//                       'aria-label': 'change date',
//                     }}
//                   />
//                 </MuiPickersUtilsProvider>
//             { isDatePicked &&
//               <div>
//                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                   <KeyboardTimePicker
//                     autoOk
//                     variant="inline"
//                     label="With keyboard"
//                     value={startTime}
//                     onChange={_handleStartTime}
//                   />
//                   <KeyboardTimePicker
//                     autoOk
//                     variant="inline"
//                     label="With keyboard"
//                     value={endTime}
//                     onChange={_handleEndTime}
//                   />
//                 </MuiPickersUtilsProvider>
//               </div>
//             }
        
//           </div>
//           }
//           { selection === 'single' &&
//           <div>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardDatePicker
//                 autoOk
//                 disableToolbar
//                 variant="inline"
//                 format="MM/dd/yyyy"
//                 margin="normal"
//                 id="date-picker-inline"
//                 label="Date picker inline"
//                 value={startTime}
//                 onChange={_handleDateChange}
//                 KeyboardButtonProps={{
//                   'aria-label': 'change date',
//                 }}
//               />
//             </MuiPickersUtilsProvider>
      
//           </div>
//           }
//           { selection === 'multiple' &&
//           <div>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardDatePicker
//                 autoOk
//                 disableToolbar
//                 variant="inline"
//                 format="MM/dd/yyyy"
//                 margin="normal"
//                 id="date-picker-inline"
//                 label="Date picker inline"
//                 value={startTime}
//                 onChange={_handleDateChange}
//                 KeyboardButtonProps={{
//                   'aria-label': 'change date',
//                 }}
//               />
//               <KeyboardDatePicker
//                 autoOk
//                 disableToolbar
//                 variant="inline"
//                 format="MM/dd/yyyy"
//                 margin="normal"
//                 id="date-picker-inline"
//                 label="Date picker inline"
//                 value={endTime}
//                 onChange={_handleDateChange}
//                 KeyboardButtonProps={{
//                   'aria-label': 'change date',
//                 }}
//               />
//             </MuiPickersUtilsProvider>
//           </div>
//           }
//         </div>
//       }
//       <div>
//         { index === steps.length - 1 ?
//           <Button variant="contained" onClick={_handleConfirm} disabled={selection === ''}>
//             Confirm
//           </Button> :
//           <Button variant="contained" onClick={_handleNext} disabled={selection === ''}>
//             Continue
//           </Button> 
//         }
//         { index !== 0 &&
//           <Button onClick={_handleBack}>
//             Back
//           </Button>
//         }
      
//       </div>
//     </StepContent>
//   </Step>
// ))}
// </Stepper> */}