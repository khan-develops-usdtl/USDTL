import * as React from 'react';
import styles from './HomeWp.module.scss';
import { IHomeWpProps } from './IHomeWpProps';
import { Grid } from '@material-ui/core'
import Announcement from './announcement/Announcement';
import TrendingInformation from './trendingInformation/TrendingInformation';
import QuickLinks from './quickLink/QuickLinks';
import Statistics from './statistic/Statistics';
import StaffDirectory from './staffDirectory/StaffDirectory';
import Calendar from './calendar/Calendar'
import NewEmployees from './newEmployee/NewEmployee';
import FormAndSurvey from './formAndSurvey/FormAndSurvey';
import TopBanner from './topBanner/TopBanner';
import Event from './event/Event'
import { SPComponentLoader } from '@microsoft/sp-loader';
import JobPosts from './jobPost/JobPosts';
import { Birthday } from './birthday/Birthday';
import GemAward from './gemAward/GemAward';
import Anniversary from './anniversary/Anniversary';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');


export default class HomeWp extends React.Component<IHomeWpProps, {}> {
  public render(): React.ReactElement<IHomeWpProps> {
    return (
      <div className={ styles.homeWp }>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}><Announcement context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><QuickLinks context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}><FormAndSurvey context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}><TopBanner context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}><Event context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><StaffDirectory context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><NewEmployees context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><TrendingInformation context={ this.props.context } /></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={8}><Calendar context={ this.props.context}/></Grid>
          {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><JobPosts context={ this.props.context }/></Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><Statistics context={ this.props.context } /></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><Birthday context={ this.props.context}/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><GemAward context={ this.props.context}/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}><Anniversary context={ this.props.context}/></Grid>
        </Grid>
      </div>
    );
  }
}
