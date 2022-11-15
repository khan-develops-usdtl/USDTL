import * as React from 'react';
import styles from './SafetyWp.module.scss'
import { ISafetyWpProps } from './ISafetyWpProps';
import About from './about/About';
import Document from './document/Document';
import { Grid } from '@material-ui/core';
import Leader from './leader/Leader';

export default class SafetyWp extends React.Component<ISafetyWpProps, {}> {
  public render(): React.ReactElement<ISafetyWpProps> {
    return (
      <div className={ styles.container }>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={9}><About context={ this.props.context }/></Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={3}><Leader context={ this.props.context }/></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div><Document context={ this.props.context }/></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
