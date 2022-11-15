import * as React from 'react';
import styles from './WpInitiatives.module.scss';
import { IWpInitiativesProps } from './IWpInitiativesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpInitiatives extends React.Component<IWpInitiativesProps, {}> {
  public render(): React.ReactElement<IWpInitiativesProps> {
    return (
      <div className={ styles.wpInitiatives }>
       INITIATIVES PAGE
      </div>
    );
  }
}
