import * as React from 'react';
import { useEffect, useState } from 'react'
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import styles from './Announcement.module.scss'
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Grid } from '@material-ui/core';
import { IAnnoucement } from './IAnnouncement';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

const Announcement = ({ context }) => {
  const [announcements, setAnnouncements] = useState<IAnnoucement[]>([])
  useEffect(() => {
    sp.setup({ spfxContext: context })
    _getAnnouncement()
  }, [])
  const _getAnnouncement = async () => {
    const announcementsRes = await sp.web.lists.getByTitle('Announcements').items.get()
    setAnnouncements(announcementsRes)
  }
  return(
    <div className={ styles.announcementWp }>
      <div className={ styles.webpartDivHeading }>
        <i className="fa fa-bullhorn fa-lg" aria-hidden="true"></i> ANNOUNCEMENTS 
      </div>
      <div className={ styles.container }>
        { announcements.map(announcement => {
          return(
            <Grid container className={ styles.gridContainer }>
              <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                { announcement.DocumentLink ?
                <a href={ announcement.DocumentLink.Url } target="_blank"><img className={ styles.announcementImage} src={ announcement.ImageLink }/></a> :
                <img className={ styles.announcementImage} src={ announcement.ImageLink }/>
                }
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={10} xl={10}>
                <div style={{ paddingLeft: '1em' }}>
                  <div className={ styles.announcementHeading }>{ announcement.Title }</div>
                  <div className={ styles.announcementDate }>Posted on { new Date(announcement.Date).toLocaleDateString('en-US') }</div>
                  <div className={ styles.announcementDesc } dangerouslySetInnerHTML={{ __html: announcement.Description }}></div>
                </div> 
              </Grid>
            </Grid>
          )
        })
        }
      </div>
    </div>
  )
}

export default Announcement
