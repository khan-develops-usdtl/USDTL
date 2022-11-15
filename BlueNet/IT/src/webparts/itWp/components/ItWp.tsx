import * as React from "react";
import styles from "./ItWp.module.scss";
import { IItWpProps } from "./IItWpProps";
import { Grid } from "@material-ui/core";
import About from "./about/About";
import Documents from "./documents/Documents";
import QuickLinks from "./quickLink/QuickLinks";

export default class ItWp extends React.Component<IItWpProps, {}> {
  public render(): React.ReactElement<IItWpProps> {
    return (
      <div className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <QuickLinks context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '2em', }}>
            <Documents context={this.props.context} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
