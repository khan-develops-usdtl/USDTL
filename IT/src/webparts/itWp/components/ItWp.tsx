import * as React from 'react';
import styles from './ItWp.module.scss';
import { IItWpProps } from './IItWpProps';
import About from './about/About';
import Leader from './leader/Leader';
import Supervisors from './supervisors/Supervisors';
import { Grid } from '@material-ui/core'
import Documents from './documents/Documents';

export default class ItWp extends React.Component<IItWpProps, {}> {
  public render(): React.ReactElement<IItWpProps> {
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Documents context={ this.props.context }/></Grid>
        </Grid>
      </div>
    );
  }
}
