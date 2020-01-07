import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Paper } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import cloudinary from "cloudinary-core";
// globals
import localizationJSON from "../utils/localization";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "hdkwrkhs8",
  secure: true
});

// css in javaScript
const styles = theme => ({
  rootReviewCard: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: theme.shadows[5]
  },
  customOvrStartReview: {
    position: "relative",
    margin: theme.spacing.unit,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  startIcon: {
    fontSize: 70
  },
  ovrTextReview: {
    position: "absolute",
    zIndex: 1
  },
  contentReviewCard: {
    padding: theme.spacing.unit
  },
  reviewHeader: {
    padding: theme.spacing.unit,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  avatarContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing.unit,
    border: `3px solid ${theme.palette.primary.dark}`,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)"
  },
  reviews: {
    margin: theme.spacing.unit,
    display: "flex",
    flexDirection: "column"
  },
  overall: {
    fontFamily: "Exo, sans-serif",
    fontWeight: 700,
    color: "#FFF",
    fontSize: "25px",
    textShadow: "#FFF 0 0 10px",
    textAlign: "center"
  },
  reviewsChild: {
    alignSelf: "flex-start",
    marginTop: theme.spacing.unit
  }
});

const ReviewCard = props => {
  const {
    teamName,
    discipline,
    effort,
    puntuality,
    teamwork,
    name,
    lastName,
    classes,
    lang
  } = props;

  // promedio
  const Promedio = (discipline + effort + puntuality + teamwork) / 4;

  const fullName = `${name.replace(/\s/g, "")}${lastName.replace(/\s/g, "")}`;

  return (
    <Paper className={classes.rootReviewCard}>
      <Paper className={classes.reviewHeader}>
        <div className={classes.avatarContent}>
          <Avatar
            className={classes.avatar}
            src={cloudinaryCore.url(
              `teams/${teamName}/miembros/${fullName}.png`
            )}
            onError={e => {
              e.target.src = "/images/fitware/silueta.png";
            }}
          />
          <Typography
            variant="subheading"
            id="simple-modal-description"
            align="center"
          >
            {name} {lastName}
          </Typography>
        </div>
        <div className={classes.customOvrStartReview}>
          <div className={classes.overall}>{Promedio}</div>
        </div>
      </Paper>
      <div className={classes.contentReviewCard}>
        <div className={classes.reviews}>
          <Typography variant="title">
            {localizationJSON[lang].discipline.toUpperCase()}
          </Typography>
          <div className={classes.reviewsChild}>
            <StarRatings
              rating={discipline}
              starRatedColor="#ff340e"
              starDimension="25px"
              numberOfStars={5}
              name="discipline"
            />
          </div>
        </div>
        <div className={classes.reviews}>
          <Typography variant="title">
            {localizationJSON[lang].effort.toUpperCase()}
          </Typography>
          <div className={classes.reviewsChild}>
            <StarRatings
              rating={effort}
              starRatedColor="#ff340e"
              starDimension="25px"
              numberOfStars={5}
              name="effort"
            />
          </div>
        </div>

        <div className={classes.reviews}>
          <Typography variant="title">
            {localizationJSON[lang].puntuality.toUpperCase()}
          </Typography>
          <div className={classes.reviewsChild}>
            <StarRatings
              rating={puntuality}
              starRatedColor="#ff340e"
              starDimension="25px"
              numberOfStars={5}
              name="puntuality"
            />
          </div>
        </div>
        <div className={classes.reviews}>
          <Typography variant="title">
            {localizationJSON[lang].teamwork.toUpperCase()}
          </Typography>
          <div className={classes.reviewsChild}>
            <StarRatings
              rating={teamwork}
              starRatedColor="#ff340e"
              starDimension="25px"
              numberOfStars={5}
              name="teamwork"
            />
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ReviewCard);
