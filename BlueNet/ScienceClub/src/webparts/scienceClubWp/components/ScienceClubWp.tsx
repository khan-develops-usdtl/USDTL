import * as React from 'react';
import styles from './ScienceClubWp.module.scss';
import { IScienceClubWpProps } from './IScienceClubWpProps';
import Announcement from './announcement/Announcement';

export default class ScienceClubWp extends React.Component<IScienceClubWpProps, {}> {
  public render(): React.ReactElement<IScienceClubWpProps> {
    return (
      <div className={ styles.scienceClubWp }>
        <Announcement context={this.props.context} />
      </div>
    );
  }
}
