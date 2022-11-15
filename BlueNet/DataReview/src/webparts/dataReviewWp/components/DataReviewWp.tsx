import * as React from 'react';
import styles from './DataReviewWp.module.scss';
import { Grid } from "@material-ui/core";
import { IDataReviewWpProps } from './IDataReviewWpProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
import About from './about/About';
import Root from './foldersAndFiles/Root';
import Calendar from './calendar/Calendar';

export default class DataReviewWp extends React.Component<IDataReviewWpProps, {}> {
  public render(): React.ReactElement<IDataReviewWpProps> {
    return (
      <div className={ styles.dataReviewWp }>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Calendar context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "4em" }}>
            <Root context={this.props.context} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
