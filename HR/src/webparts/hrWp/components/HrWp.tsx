import * as React from 'react';
import About from './about/About';
import Document from './document/Document';
import styles from './HrWp.module.scss';
import { IHrWpProps } from './IHrWpProps';
import Leader from './leader/Leader';
import { Grid } from '@material-ui/core';
import Supervisors from './supervisors/Supervisors';

export default class HrWp extends React.Component<IHrWpProps, {}> {
  public render(): React.ReactElement<IHrWpProps> {
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
                <div className={ styles.document }><Document context={ this.props.context }/></div>
              </Grid>
        </Grid>
      </div>
    );
  }
}
