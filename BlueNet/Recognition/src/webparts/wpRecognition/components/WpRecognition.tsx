import * as React from 'react';
import styles from './WpRecognition.module.scss';
import { IWpRecognitionProps } from './IWpRecognitionProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpRecognition extends React.Component<IWpRecognitionProps, {}> {
  public render(): React.ReactElement<IWpRecognitionProps> {
    return (
      <div className={ styles.wpRecognition }>
       RECOGNITION PAGE
      </div>
    );
  }
}
