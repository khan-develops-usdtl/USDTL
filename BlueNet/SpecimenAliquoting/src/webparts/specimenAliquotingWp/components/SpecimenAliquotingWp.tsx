import * as React from 'react';
import styles from './SpecimenAliquotingWp.module.scss';
import { ISpecimenAliquotingWpProps } from './ISpecimenAliquotingWpProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Grid } from '@material-ui/core';
import About from './about/About';
import Root from './foldersAndFiles/Root';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class SpecimenAliquotingWp extends React.Component<ISpecimenAliquotingWpProps, {}> {
  public render(): React.ReactElement<ISpecimenAliquotingWpProps> {
    return (
      <div className={ styles.container }>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "4em" }}>
            <Root/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
