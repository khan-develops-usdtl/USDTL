import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import styles from "./Event.module.scss";
import * as moment from "moment";
import { IEvent } from "./IEvent";

const Event = ({ context }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getEvents();
  }, []);
  const _getEvents = async () => {
    const eventsRes: IEvent[] = await sp.web.lists.getByTitle("Event").items.get();
    const events: IEvent[] = eventsRes.sort((a, b) => new Date(a.EventDate).getTime() - new Date(b.EventDate).getTime());
    setEvents(events);
  };
  return (
    <div className={styles.event}>
      <div className={styles.heading}>
        <i className="fa fa-calendar fa-lg" aria-hidden="true"></i> EVENTS
      </div>
      <div className={styles.container}>
        {events.map((event) => (
          <div className={ styles.content}>
            <div className={styles.date}>
              { moment(event.EventDate).format("MM/DD/YY") }
            </div>
            <div>
              <div className={styles.eventTitle}>{event.Title}</div>
              <div className={styles.eventDescription}>{event.EventDescription}</div>
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.link}>
              {event.EventLink && (
                <a href={event.EventLink} target="_blank" className={styles.eventLink}>
                  <i
                    className="fa fa-link fa-1x"
                    aria-hidden="true"
                    style={{ color: "#1347a4" }}></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
{
  /* 

{events.map((event) => {
  return (
    <Grid container className={styles.gridContainer}>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        xl={2}
        className={styles.gridItemDate}
      >
        <Paper style={{ width: "100%", height: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <div className={styles.currentEventDate}>
              {event.Month} {event.Day}
            </div>
            <div className={styles.currentEventMonth}>{event.Year}</div>
          </div>
        </Paper>
      </Grid>
      <Grid
        item
        xs={9}
        sm={9}
        md={9}
        lg={9}
        xl={9}
        className={styles.gridItemContent}
      >
        <div style={{ padding: "0 0 0 0.5em" }}>
          <div className={styles.currentEventTitle}>{event.Title}</div>
          <div className={styles.currentEventDescription}>
            {event.EventDescription}
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        className={styles.gridItemContent}
      >
        {event.EventLink && (
          <a
            href={event.EventLink}
            target="_blank"
            className={styles.eventLink}
          >
            <i
              className="fa fa-link fa-1x"
              aria-hidden="true"
              style={{ color: "#1347a4" }}
            ></i>
          </a>
        )}
      </Grid>
    </Grid>
  );
})} */
}
