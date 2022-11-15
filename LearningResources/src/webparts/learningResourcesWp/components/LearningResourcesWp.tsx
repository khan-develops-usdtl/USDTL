import * as React from 'react';
import styles from './LearningResourcesWp.module.scss';
import { ILearningResourcesWpProps } from './ILearningResourcesWpProps';
import { Grid } from '@material-ui/core';
import Poster from './poster/Poster';
import { SPComponentLoader } from '@microsoft/sp-loader';
import VideoLibrary from './videoLibrary/VideoLibrary';
import RecommendedReading from './recommendedReading/RecommendedReading';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class LearningResourcesWp extends React.Component<ILearningResourcesWpProps, {}> {
  public render(): React.ReactElement<ILearningResourcesWpProps> {
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
