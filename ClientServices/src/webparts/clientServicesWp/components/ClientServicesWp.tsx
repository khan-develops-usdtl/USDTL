import * as React from 'react';
import styles from './ClientServicesWp.module.scss';
import { IClientServicesWpProps } from './IClientServicesWpProps';
import 'office-ui-fabric-react/dist/css/fabric.css';
import About from './about/About';
import Leader from './leader/Leader';
import { Grid } from '@material-ui/core';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Supervisors from './supervisors/Supervisors';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class ClientServicesWp extends React.Component<IClientServicesWpProps, {}> {
  public render(): React.ReactElement<IClientServicesWpProps> {
    return (
      <div className={ styles.container }>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={9}><About context={ this.props.context }/></Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={3}><Leader context={ this.props.context }/></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Supervisors context={ this.props.context }/></Grid>
        </Grid>
      </div>
    );
  }
}
