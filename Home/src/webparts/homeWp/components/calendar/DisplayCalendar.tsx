import * as React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction'

const DisplayCalendar = ({ calendars }) => {
    return(
        <FullCalendar
            initialView="dayGridMonth"
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            displayEventTime={false}
            themeSystem="standard"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={ calendars }
            eventClick={ (info) => {
                console.log('event click')
            }
            }
            dateClick={ (info) => {
                console.log('date click')
            }}   
        />
    )
}

export default DisplayCalendar