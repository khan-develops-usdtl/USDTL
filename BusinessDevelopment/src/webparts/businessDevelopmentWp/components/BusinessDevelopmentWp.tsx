import * as React from 'react';
import About from './about/About';
import Leader from './leader/Leader';
import { Grid } from '@material-ui/core';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Supervisors from './supervisors/Supervisors';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from './BusinessDevelopmentWp.module.scss';
import SalesTraining from './salesTraining/SalesTraining';
import { IBusinessDevelopmentWpProps } from './IBusinessDevelopmentWpProps';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');


export default class BusinessDevelopmentWp extends React.Component<IBusinessDevelopmentWpProps, {}> {
  public render(): React.ReactElement<IBusinessDevelopmentWpProps> {
    return (
      <div className={ styles.container }>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={9}><About context={ this.props.context }/></Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={3}><Leader context={ this.props.context }/></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Supervisors context={ this.props.context }/></Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><SalesTraining context={ this.props.context }/></Grid>
        </Grid>
      </div>
    );
  }
}
