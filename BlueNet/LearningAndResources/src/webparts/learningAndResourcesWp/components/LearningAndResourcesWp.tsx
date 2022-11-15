import * as React from 'react';
import { ILearningAndResourcesWpProps } from './ILearningAndResourcesWpProps';
import styles from './LearningAndResourcesWp.module.scss'
import { Grid } from '@material-ui/core';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Poster from './poster/Poster';
import VideoLibrary from './videoLibrary/VideoLibrary';
import RecommendedReading from './recommendedReading/RecommendedReading';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class LearningAndResourcesWp extends React.Component<ILearningAndResourcesWpProps, {}> {
  public render(): React.ReactElement<ILearningAndResourcesWpProps> {
    return (
      <div className={ styles.learningResourcesWp }>
        <div className={ styles.mainHeading }>LEARNING RESOURCES</div>
        <Grid container spacing={1} style={{ padding: '0 10px 0 10px' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Poster context={this.props.context}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <VideoLibrary context={this.props.context}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RecommendedReading context={this.props.context}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
