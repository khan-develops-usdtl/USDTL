import * as React from "react";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IVideo } from "./IVideo";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  createStyles,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import styles from "./VideoLibrary.module.scss";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ReactPlayer from "react-player";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: 120,
      backgroundColor: "#2f3643",
    },
    title: {
      fontSize: 14,
      color: "#fff",
      fontWeight: 600,
    },
  })
);

const VideoLibrary = ({ context }) => {
  const classes = useStyles();

  const [categories, setCategories] = useState<string[]>([]);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [activeButton, setActiveButton] = useState<string>("All");

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getVideo();
  }, []);
  const _getVideo = async () => {
    //Video library item limit extended to 5000
    const videos: IVideo[] = await sp.web.lists.getByTitle("Video Library").items.top(5000).get();
    const temp: string[] = [];
    videos.map((video) => {
      temp.push(video.Category);
    });
    const categories = temp.filter((category, index) => {
      return temp.indexOf(category) === index;
    });
    setCategories(categories);
    console.log(videos)
    setVideos(videos);
  };
  return (
    <div className={styles.videoLibraryWp}>
      <div className={styles.videoLibraryHeading}>
        <i className="fa fa-file-video-o fa-lg" aria-hidden="true"></i> VIDEO LIBRARY
      </div>

      <div style={{ marginBottom: "1em" }}>
        <button
          className={styles.button}
          onClick={(e) => {
            setActiveButton("All");
            e.preventDefault();
          }}>
          All
        </button>
        {categories.map((category) => (
          <button
            className={styles.button}
            onClick={(e) => {
              setActiveButton(category);
              e.preventDefault();
            }}>
            {category}
          </button>
        ))}
      </div>

      <Grid container spacing={2} style={{ height: "36em", overflowY: "auto", marginBottom: 10 }}>
        {videos
          .filter((video) => {
            if (activeButton === "All") {
              return video;
            } else {
              return video.Category === activeButton;
            }
          })
          .map((video) => (
            <Grid item xs={12} sm={12} md={6} lg={3} xl={2}>
              <Card className={classes.root}>
                <CardActionArea href={video.VideoLink.Url} target="_blank">
                  <CardContent>
                    <Typography className={classes.title} gutterBottom>
                      {video.Title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <PlayCircleOutlineIcon style={{ color: "#fff", fontSize: 16 }} />
                  <a
                    style={{ color: "#fff", fontSize: 14 }}
                    href={video.VideoLink.Url}
                    target="_blank">
                    WATCH VIDEO
                  </a>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default VideoLibrary;
