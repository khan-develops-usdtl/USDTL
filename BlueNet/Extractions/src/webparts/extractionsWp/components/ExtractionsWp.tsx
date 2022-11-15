import * as React from "react";
import styles from "./ExtractionsWp.module.scss";
import { Grid } from "@material-ui/core";
import { IExtractionsWpProps } from "./IExtractionsWpProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import About from "./about/About";
import Root from "./foldersAndFiles/Root";
SPComponentLoader.loadCss(
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
);

export default class ExtractionsWp extends React.Component<IExtractionsWpProps, {}> {
  public render(): React.ReactElement<IExtractionsWpProps> {
    return (
      <div className={styles.extractionsWp}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "4em" }}>
            <Root context={this.props.context} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
