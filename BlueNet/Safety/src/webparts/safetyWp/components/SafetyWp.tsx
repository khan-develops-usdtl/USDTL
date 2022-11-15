import * as React from "react";
import styles from "./SafetyWp.module.scss";
import { ISafetyWpProps } from "./ISafetyWpProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import About from "./about/About";
import { Grid } from "@material-ui/core";
import Layer1 from "./foldersAndFiles/layer1/Layer1";
import VideoLibrary from "./videoLibrary/VideoLibrary";
SPComponentLoader.loadCss(
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
);

export default class SafetyWp extends React.Component<ISafetyWpProps, {}> {
  public render(): React.ReactElement<ISafetyWpProps> {
    return (
      <div className={styles.safetyWp}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <About context={this.props.context} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Layer1 layer1FolderName={ 'Safety' }/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <VideoLibrary context={this.props.context}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
