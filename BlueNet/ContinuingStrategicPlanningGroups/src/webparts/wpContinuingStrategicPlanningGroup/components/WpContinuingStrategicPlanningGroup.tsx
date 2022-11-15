import * as React from 'react';
import { IWpContinuingStrategicPlanningGroupProps } from './IWpContinuingStrategicPlanningGroupProps';
import styles from './WpContinuingStrategicPlanningGroup.module.scss';

export default class WpContinuingStrategicPlanningGroup extends React.Component<IWpContinuingStrategicPlanningGroupProps, {}> {
  public render(): React.ReactElement<IWpContinuingStrategicPlanningGroupProps> {
    return (
      <div className={ styles.continuingStrategicPlanningGroupWp }>
        Hello
      </div>
    );
  }
}
