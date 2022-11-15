import * as React from 'react';
import styles from './RdWp.module.scss';
import { IRdWpProps } from './IRdWpProps';
import { Grid } from "@material-ui/core";
import { SPComponentLoader } from '@microsoft/sp-loader';
import About from './about/About';
import Root from './foldersAndFiles/Root';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class RdWp extends React.Component<IRdWpProps, {}> {
  public render(): React.ReactElement<IRdWpProps> {
    return (
      <div className={ styles.rdWp }>
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
