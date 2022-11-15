import * as React from 'react';
import Announcement from './announcement/Announcement';
import Calendar from './calendar/Calendar';
import DailyAccession from './dailyAccession/DailyAccession';
import Event from './event/Event';
import styles from './HomeWp.module.scss';
import { IHomeWpProps } from './IHomeWpProps';
import JobPosting from './jobPosting/JobPosting';
import NewEmployees from './newEmployee/NewEmployee';
import QuickLink from './quickLink/QuickLink';
import StaffDirectory from './staffDirectory/StaffDirectory';
import Statistics from './statistic/Statistics';
import TopBanner from './topBanner/TopBanner';
import { Grid } from '@material-ui/core'
import FormAndSurvey from './formAndSurvey/FormAndSurvey';

export default class HomeWp extends React.Component<IHomeWpProps, {}> {

  public constructor(props: IHomeWpProps) {
    super(props)
  }
  public render(): React.ReactElement<IHomeWpProps> {
    return (
      <div className={ styles.container }>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}><Announcement context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><QuickLink siteUrl={ this.props.siteUrl }/></Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}><FormAndSurvey context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}><TopBanner context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}><Event context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><StaffDirectory context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><NewEmployees context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><DailyAccession siteUrl={ this.props.siteUrl } /></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><Calendar context={ this.props.context}/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><JobPosting siteUrl={ this.props.siteUrl }/></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}><Statistics siteUrl={ this.props.siteUrl } /></Grid>
        </Grid>
      </div>
    );
  }
}

{/* <div className={ styles.homeContainerDiv }>
<div className={ styles.announcementDiv }><Announcement siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.quickLinkDiv }><QuickLink siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.topBannerDiv}><TopBanner siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.eventsDiv}><Event siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.staffDirectoryDiv}><StaffDirectory siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.newEmployeesDiv}><NewEmployees siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.dailyAccession}><DailyAccession siteUrl={ this.props.siteUrl } /></div>
<div className={ styles.calendarDiv}><Calendar siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.jobPostingDiv}><JobPosting siteUrl={ this.props.siteUrl }/></div>
<div className={ styles.statistics}><Statistics siteUrl={ this.props.siteUrl } /></div>
</div> */}
