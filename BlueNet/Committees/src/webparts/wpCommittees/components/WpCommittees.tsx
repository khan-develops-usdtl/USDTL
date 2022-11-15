import * as React from 'react';
import styles from './WpCommittees.module.scss';
import { IWpCommitteesProps } from './IWpCommitteesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpCommittees extends React.Component<IWpCommitteesProps, {}> {
  public render(): React.ReactElement<IWpCommitteesProps> {
    return (
      <div className={ styles.wpCommittees }>
      COMMITTEES PAGE 
      </div>
    );
  }
}
