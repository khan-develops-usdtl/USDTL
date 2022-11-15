import { Grid } from '@material-ui/core';
import * as React from 'react';
import About from './about/About';
import styles from './ClientServicesWp.module.scss';
import Root from './foldersAndFiles/Root';
import { IClientServicesWpProps } from './IClientServicesWpProps';
import { SPComponentLoader } from "@microsoft/sp-loader";
SPComponentLoader.loadCss(
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
);

export default class ClientServicesWp extends React.Component<IClientServicesWpProps, {}> {
  public render(): React.ReactElement<IClientServicesWpProps> {
    return (
      <div className={ styles.container }>
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
