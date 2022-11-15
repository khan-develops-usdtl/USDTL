import styles from "./Calendar.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as React from "react";
import { useState, useEffect } from "react";
import { ICalendar } from "./IStates";
import { sp } from "@pnp/sp";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IContextInfo } from "@pnp/sp/sites";
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { DialogType } from "office-ui-fabric-react/lib/Dialog";
import styled from "styled-components";
import * as moment from "moment";

const Calendar = ({ context }) => {
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [dialogHidden, setDialogHidden] = useState<boolean>(true);
  const [dialogUrl, setDialogUrl] = useState<string>("");

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getContext();
    _getEvents();
  }, []);
  const _getContext = async () => {
    const oContext: IContextInfo = await sp.site.getContextInfo();
    setSiteUrl(oContext.SiteFullUrl);
  };
  const _getEvents = async () => {
    const calendarsRes = await sp.web.lists.getByTitle("Calendar").items.top(10000).get();
    const calendars = calendarsRes.map((calendar) => ({
      ...calendar,
      id: calendar.ID,
      title: calendar.Title,
      start: moment(calendar.EventDate).add(1, "days").format("YYYY-MM-DD"),
      end: moment(calendar.EndDate).add(1, "days").format("YYYY-MM-DD"),
      url: `${siteUrl}/Laboratory/DataReview/Lists/Calendar/DispForm.aspx?ID=${calendar.ID}`,
      allDay: true,
    }));
    setCalendars(calendars);
  };
  return (
    <div className={styles.calendarWp}>
      <div className={styles.heading}>
        <i className="fa fa-calendar-o fa-lg" aria-hidden="true"></i> OUT OF OFFICE CALENDAR
      </div>
      <div className={styles.container}>
        <CalendarStyling>
          <FullCalendar
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            themeSystem="standard"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            displayEventTime={false}
            events={calendars}
            eventMouseEnter={(info) => {}}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              setDialogUrl(info.event.url);
              setDialogHidden(false);
            }}
            dateClick={(info) => {
              window.open("https://usdtl.sharepoint.com/Laboratory/DataReview/Lists/Calendar/calendar.aspx");
            }}
          />
        </CalendarStyling>
      </div>

      <IFrameDialog
        url={dialogUrl}
        hidden={dialogHidden}
        onDismiss={() => setDialogHidden(true)}
        modalProps={{
          isBlocking: true,
        }}
        dialogContentProps={{
          type: DialogType.close,
          showCloseButton: true,
        }}
        width={"70%"}
        height={"70%"}
      />
    </div>
  );
};

export default Calendar;

const CalendarStyling = styled.div`
  .fc .fc-toolbar h2 {
    font-size: 1em !important;
    color: #1347a4;
  }
  .fc .fc-button {
    background-color: #1347a4;
    font-size: 0.6em;
  }
  @media screen and (max-width: 1441px) {
    .fc-toolbar h2 {
      font-size: 1.1em !important;
    }
  }

  @media screen and (max-width: 1153px) {
    .fc-toolbar h2 {
      font-size: 1em !important;
    }
  }

  @media screen and (max-width: 430px) {
    .calendarInnerDiv {
      height: auto;
    }
  }

  @media screen and (max-width: 330px) {
    .fc {
      width: 290px !important;
    }
  }
  .fc-time {
    display: none !important;
  }
`;
