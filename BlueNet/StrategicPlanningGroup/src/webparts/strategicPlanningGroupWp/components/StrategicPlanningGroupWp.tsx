import * as React from 'react';
import styles from './StrategicPlanningGroupWp.module.scss';
import { IStrategicPlanningGroupWpProps } from './IStrategicPlanningGroupWpProps';
import Site from './site/Site';

export default class StrategicPlanningGroupWp extends React.Component<IStrategicPlanningGroupWpProps, {}> {
  public render(): React.ReactElement<IStrategicPlanningGroupWpProps> {
    return (
      <div className={ styles.strategicPlanningGroupWp }>
        <Site context={this.props.context}/>
      </div>
    );
  }
}
