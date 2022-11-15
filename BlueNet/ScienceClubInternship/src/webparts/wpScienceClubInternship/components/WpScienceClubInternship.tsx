import * as React from 'react';
import styles from './WpScienceClubInternship.module.scss';
import { IWpScienceClubInternshipProps } from './IWpScienceClubInternshipProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpScienceClubInternship extends React.Component<IWpScienceClubInternshipProps, {}> {
  public render(): React.ReactElement<IWpScienceClubInternshipProps> {
    return (

      <div className={ styles.wpScienceClubInternship }>
      
       SCIENCE CLUB INTERNSHIP PAGE
      </div>
      
       
      
    );
  }
}
