import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import styles from "./RecommendedReading.module.scss";
import * as React from "react";
import { useEffect, useState } from "react";
import { IReading, IReview } from "./IReading";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import { Alert } from "@material-ui/lab";
import { IContextInfo } from "@pnp/sp/sites";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "16em",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "9em",
      [theme.breakpoints.down("sm")]: {
        width: "5em",
      },
    },
    readMore: {
      display: "flex",
      flexDirection: "column",
    },
    readMoreDetails: {
      display: "flex",
    },
    readMoreCover: {
      width: "10em",
      [theme.breakpoints.down("sm")]: {
        width: "6em",
      },
    },
  })
);

const RecommendedReading = ({ context }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [categories, setCategories] = useState<string[]>([]);

  const [readings, setReadings] = useState<IReading[]>([]);
  const [readingDetails, setReadingDetails] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [selectedReading, setSelectedReading] = useState<IReading | undefined>(undefined);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [currentUserIamge, setCurrentUserIamge] = useState<string | undefined>(undefined);
  const [activeButton, setActiveButton] = useState<string>("All");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"error" | "info" | "success" | "warning">("success");

  useEffect(() => {
    sp.setup({ spfxContext: context });
    _getReadings();
    _getReviews();
    _getCurrentUserImage();
    _getReadingCategories();
  }, []);
  const _getReadings = async () => {
    const readingsRes: IReading[] = await sp.web.lists
      .getByTitle("Recommended Reading")
      .items.get();
    const readings = readingsRes.map((reading) => {
      _getAverageRatingById(reading.ID).then((rating) => (reading.AverageRating = rating));
      return reading;
    });
    setReadings(readings);
  };
  const _getReadingCategories = async () => {
    const readingsRes: IReading[] = await sp.web.lists
      .getByTitle("Recommended Reading")
      .items.get();
    const temp: string[] = [];
    readingsRes.map((reading) => {
      temp.push(reading.Category);
    });
    const categoriesRes = temp.filter((category, index) => {
      return temp.indexOf(category) === index;
    });
    setCategories(categoriesRes);
  };
  const _getCurrentUserImage = async () => {
    const siteContext: IContextInfo = await sp.site.getContextInfo();
    const currentUser = await sp.web.currentUser();
    const PictureUrl =
      siteContext.SiteFullUrl + "/_layouts/15/userphoto.aspx?size=M&username=" + currentUser.Email;
    setCurrentUserIamge(PictureUrl);
  };
  const _getReviews = async () => {
    const reviewsRes: IReview[] = await sp.web.lists
      .getByTitle("Book Reviews")
      .items.select("ID", "Rating", "Comment", "Created", "Author/Title", "ImageUrl", "Book/Id")
      .expand("Author", "Book")
      .get();
    setReviews(reviewsRes);
  };
  const _handleReadingDetails = (selectedReading) => {
    setSelectedReading(selectedReading);
    setReadingDetails(true);
  };
  const _handleGoBack = () => {
    setReadingDetails(false);
    setSelectedReading(undefined);
    setReadMore(false);
  };
  const _getAverageRatingById = async (bookID) => {
    const reviewsRes: IReview[] = await sp.web.lists
      .getByTitle("Book Reviews")
      .items.select("ID", "Rating", "Comment", "Created", "Author/Title", "ImageUrl", "Book/Id")
      .expand("Author", "Book")
      .get();
    const numberOfReviewsByID = reviewsRes.filter((review) => review.Book.Id === bookID).length;
    const totalRating = reviewsRes
      .filter((review) => review.Book.Id === bookID)
      .reduce((acc, obj) => {
        return acc + obj.Rating;
      }, 0);
    const averageRating = totalRating / numberOfReviewsByID;
    return averageRating;
  };
  const _handleSnackbarClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  const _handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (rating === null || comment === "") {
      setMessage("Please rate and write a review to submit your review.");
      setIsSnackbarOpen(true);
      setSeverity("error");
      return;
    }
    if (rating !== 0 && comment !== "") {
      await sp.web.lists
        .getByTitle("Book Reviews")
        .items.add({
          Rating: rating,
          Comment: comment,
          BookId: selectedReading.ID,
          ImageUrl: {
            Url: currentUserIamge,
          },
        })
        .then(async (res) => {
          _getAverageRatingById(res.data.BookId).then(async (rating) => {
            await sp.web.lists
              .getByTitle("Recommended Reading")
              .items.getById(res.data.BookId)
              .update({
                AverageRating: rating,
              })
              .then(async () => {
                const readingRes = await sp.web.lists
                  .getByTitle("Recommended Reading")
                  .items.getById(res.data.BookId)
                  .get();
                setSelectedReading(readingRes);
                setRating(null);
                setComment("");
                setMessage("You review submitted successfully");
                setIsSnackbarOpen(true);
                setSeverity("success");
                _getReadings();
                _getReviews();
              });
          });
        })
        .catch((error) => {
          setMessage(error.toString());
          setIsSnackbarOpen(true);
          setSeverity("error");
        });
    }
  };

  const _handleTabs = (e, category) => {
    e.preventDefault();
    setReadMore(true);
    setReadingDetails(false);
    setActiveButton(category);
  };

  return (
    <div className={styles.recommendedReadingWp} style={{ padding: "0 5px" }}>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(true)}>
        <Alert onClose={_handleSnackbarClose} severity={severity} style={{ fontSize: "large" }}>
          {message}
        </Alert>
      </Snackbar>
      <div className={styles.mainHeading}>
        <i className="fa fa-book fa-lg" aria-hidden="true"></i> RECOMMENDED READING
      </div>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ paddingBottom: 10, borderBottom: "1px solid #dddddd", marginBottom: 10 }}>
          <button
            className={styles.button}
            onClick={(e) => _handleTabs(e, "All")}>
            All
          </button>
          {categories.map((category) => (
            <button
              className={styles.button}
              onClick={(e) => _handleTabs(e, category)}>
              {category}
            </button>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ padding: "10px 20px", borderBottom: "1px solid #dddddd" }}>
          {!readingDetails ? (
            <Grid
              container
              spacing={1}
              style={{ height: "35em", overflowY: "auto", marginBottom: "1px" }}>
              {readings
                .filter((reading) => {
                  if (activeButton === "All") {
                    return reading;
                  } else {
                    return activeButton === reading.Category;
                  }
                })
                .map((reading) => (
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Card className={classes.root} variant="outlined">
                      <CardMedia
                        className={classes.cover}
                        component="img"
                        image={reading.ImageLink}
                        title="Book Cover Image"
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <a
                            href="javascript:;"
                            className={styles.readingLink}
                            onClick={() => _handleReadingDetails(reading)}>
                            <div className={styles.userReviewTitle}>
                              {reading.Title.length > 40
                                ? reading.Title.slice(0, 40) + "..."
                                : reading.Title}
                            </div>
                          </a>
                          <div className={styles.readingDate}>
                            {new Date(reading.Date).toLocaleDateString("en-US")}
                          </div>
                          <Rating
                            value={reading.AverageRating}
                            readOnly
                            precision={0.1}
                            style={{ fontSize: "1.75em" }}></Rating>
                          {reading.Description.length > 265 && (
                            <div
                              className={styles.readingDescription}
                              dangerouslySetInnerHTML={{
                                __html: reading.Description.slice(0, 200) + "...",
                              }}></div>
                          )}
                          {reading.Description.length < 266 && (
                            <div
                              className={styles.readingDescription}
                              dangerouslySetInnerHTML={{ __html: reading.Description }}></div>
                          )}
                        </CardContent>
                        <CardActions>
                          <Button
                            size="large"
                            color="primary"
                            href={reading.AmazonLink}
                            target="_blank">
                            Amazon Link
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card className={classes.readMore} variant="outlined">
                  <div className={classes.readMoreDetails}>
                    <CardMedia
                      className={classes.readMoreCover}
                      component="img"
                      image={selectedReading.ImageLink}
                      title="Book Cover Image"
                    />
                    <CardContent>
                      <div className={styles.userReviewTitle}>{selectedReading.Title}</div>
                      <div className={styles.readingDate}>
                        {new Date(selectedReading.Date).toLocaleDateString("en-US")}
                      </div>
                      <Rating
                        value={selectedReading.AverageRating}
                        precision={0.1}
                        readOnly
                        style={{ fontSize: "1.75em" }}></Rating>
                    </CardContent>
                  </div>
                  <CardContent>
                    <div className={styles.readingDescription}>
                      {selectedReading.Description.length < 266 && (
                        <div
                          className={styles.readingDescription}
                          dangerouslySetInnerHTML={{ __html: selectedReading.Description }}></div>
                      )}
                      {selectedReading.Description.length > 265 && (
                        <div>
                          {readMore && (
                            <div
                              className={styles.readingDescription}
                              dangerouslySetInnerHTML={{
                                __html: selectedReading.Description,
                              }}></div>
                          )}
                          {!readMore && (
                            <div
                              className={styles.readingDescription}
                              dangerouslySetInnerHTML={{
                                __html: selectedReading.Description.slice(0, 200) + "...",
                              }}></div>
                          )}
                          <Button
                            color="primary"
                            size="large"
                            onClick={() => setReadMore((readMore) => !readMore)}
                            style={{ float: "right" }}>
                            {readMore ? "read less" : "read more"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Grid container>
                  <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <span className={styles.validation}>*</span>Rating:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <Rating
                      value={rating}
                      onChange={(e, value) => setRating(value)}
                      style={{ fontSize: "1.75em" }}></Rating>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <span className={styles.validation}>*</span>Comment:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <textarea
                      rows={5}
                      style={{ width: "100%" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}></textarea>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ float: "right", paddingTop: 10 }}>
                    <button className={styles.submitButton} onClick={_handleRatingSubmit}>
                      Submit Review
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {readingDetails && (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: "5px 0" }}>
                <div className={styles.reviewTitle}>Users Reviews</div>
              </Grid>
              {reviews.filter((review) => review.Book.Id === selectedReading.ID).length < 1 ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ textAlign: "center", marginTop: "1em" }}>
                  <div style={{ padding: "10px 0" }}>
                    Currently, there are no reviews for this book.
                  </div>
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {reviews
                    .filter((review) => review.Book.Id === selectedReading.ID)
                    .map((review) => (
                      <Grid
                        container
                        spacing={1}
                        style={{ borderBottom: "1px solid #dddddd", padding: "5px 0" }}>
                        <Grid
                          item
                          xs={12}
                          sm={1}
                          md={1}
                          lg={1}
                          xl={1}
                          alignItems="center"
                          justify="center"
                          style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <img className={styles.userReviewImage} src={review.ImageUrl.Url} />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                          <div>
                            <div className={styles.userReviewTitle}>{review.Author.Title}</div>
                            <div>
                              <Rating
                                value={review.Rating}
                                precision={0.1}
                                readOnly
                                style={{ fontSize: "1.75em" }}></Rating>
                            </div>
                            <div className={styles.userReviewComment}>{review.Comment}</div>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={3}
                          md={3}
                          lg={3}
                          xl={3}
                          style={{ textAlign: "right" }}>
                          <div className={styles.userReviewDate}>
                            {new Date(review.Created).toLocaleDateString("en-US")}
                          </div>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Grid>
          )}
          {readingDetails && (
            <p style={{ padding: "10px 0" }}>
              <a href="javascript:;" onClick={_handleGoBack}>
                <i className="fa fa-chevron-circle-left marginRight" aria-hidden="true"></i> Go Back
              </a>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RecommendedReading;

{
  /* <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
    <Card style={{ width: }}>
      <img src={ reading.ImageLink } alt="" />
    </Card>
  </Grid>
  <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
    <a href="javascript:;" className={styles.readingLink} onClick={() => _handleReadingDetails(reading)}>
      <div className={styles.userReviewTitle}>{reading.Title.length > 40 ? reading.Title.slice(0, 40) + "..." : reading.Title}</div>
    </a>
    <div className={styles.readingDate}>{new Date(reading.Date).toLocaleDateString("en-US")}</div>
    <Rating value={reading.AverageRating} readOnly precision={0.1} style={{ fontSize: "1.75em" }}></Rating>
    <div className={styles.readingDescription}>{reading.Description.length > 150 ? reading.Description.slice(0, 150) + "..." : reading.Description}</div>
  </Grid>
</Grid>
</Grid> */
}
