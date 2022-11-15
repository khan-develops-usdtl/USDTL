import * as React from "react";
import styles from "./ScreeningWp.module.scss";
import { Grid } from "@material-ui/core";
import { IScreeningWpProps } from "./IScreeningWpProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import About from "./about/About";
import Calendar from "./calendar/Calendar";
import Layer1 from "./foldersAndFiles/layer1/Layer1";
SPComponentLoader.loadCss(
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
);

export default class ScreeningWp extends React.Component<IScreeningWpProps, {}> {
  public render(): React.ReactElement<IScreeningWpProps> {
    return (
      <div className={styles.screeningWp}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ marginTop: "4em" }}>
            <Calendar context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} style={{ marginTop: "4em" }}>
            <Layer1 layer1FolderName={"Shared Documents"} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
