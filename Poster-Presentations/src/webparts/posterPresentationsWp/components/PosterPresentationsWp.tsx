import * as React from 'react';
import styles from './PosterPresentationsWp.module.scss';
import { IPosterPresentationsWpProps } from './IPosterPresentationsWpProps';
import Poster from './poster/Poster';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class PosterPresentationsWp extends React.Component<IPosterPresentationsWpProps, {}> {
  public render(): React.ReactElement<IPosterPresentationsWpProps> {
    return (
      <div className={ styles.posterPresentationsWp }>
        <Poster context={this.props.context}/>
      </div>
    );
  }
}
