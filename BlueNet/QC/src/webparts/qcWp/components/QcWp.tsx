import * as React from 'react';
import styles from './QcWp.module.scss';
import { IQcWpProps } from './IQcWpProps';
import { Grid } from "@material-ui/core";
import About from './about/About';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Root from './foldersAndFiles/Root';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class QcWp extends React.Component<IQcWpProps, {}> {
  public render(): React.ReactElement<IQcWpProps> {
    return (
      <div className={ styles.qcWp }>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "4em" }}>
            <Root context={this.props.context} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
