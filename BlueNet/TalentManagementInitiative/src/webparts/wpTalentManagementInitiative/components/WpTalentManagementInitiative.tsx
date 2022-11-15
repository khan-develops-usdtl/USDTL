import * as React from 'react';
import styles from './WpTalentManagementInitiative.module.scss';
import { IWpTalentManagementInitiativeProps } from './IWpTalentManagementInitiativeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpTalentManagementInitiative extends React.Component<IWpTalentManagementInitiativeProps, {}> {
  public render(): React.ReactElement<IWpTalentManagementInitiativeProps> {
    return (
      <div className={ styles.wpTalentManagementInitiative }>
      TALENT MANAGEMENT INITIATIVE (TMI) PAGE
      </div>
    );
  }
}
