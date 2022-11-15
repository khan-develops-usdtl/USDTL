import * as React from 'react';
import styles from './VideoLibraryWp.module.scss';
import { IVideoLibraryWpProps } from './IVideoLibraryWpProps'
import { SPComponentLoader } from '@microsoft/sp-loader';
import VideoLibrary from './videoLibrary/VideoLibrary';
SPComponentLoader.loadCss('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

export default class VideoLibraryWp extends React.Component<IVideoLibraryWpProps, {}> {
  public render(): React.ReactElement<IVideoLibraryWpProps> {
    return (
      <div className={ styles.videoLibraryWp }>
        <VideoLibrary context={this.props.context}/>
      </div>
    );
  }
}
