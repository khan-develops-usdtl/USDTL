import * as React from 'react';
import styles from './VideoLibraryWp.module.scss';
import { IVideoLibraryWpProps } from './IVideoLibraryWpProps';
import VideoLibrary from './videoLibrary/VideoLibrary';

export default class VideoLibraryWp extends React.Component<IVideoLibraryWpProps, {}> {
  public render(): React.ReactElement<IVideoLibraryWpProps> {
    return (
      <div className={ styles.videoLibraryWp }>
        <VideoLibrary context={this.props.context}/>
      </div>
    );
  }

}
