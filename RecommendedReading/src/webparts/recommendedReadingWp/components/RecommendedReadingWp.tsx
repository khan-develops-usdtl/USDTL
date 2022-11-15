import * as React from 'react';
import styles from './RecommendedReadingWp.module.scss';
import { IRecommendedReadingWpProps } from './IRecommendedReadingWpProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import RecommendedReading from './recommendedReading/RecommendedReading';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class RecommendedReadingWp extends React.Component<IRecommendedReadingWpProps, {}> {
  public render(): React.ReactElement<IRecommendedReadingWpProps> {
    return (
      <div className={ styles.recommendedReadingWp }>
        <RecommendedReading context={this.props.context}/>
      </div>
    );
  }
}
