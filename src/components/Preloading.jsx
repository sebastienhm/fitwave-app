import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    margin: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    fontFamily: "Exo, sans-serif",
    fontWeight: 900,
    fontStyle: "italic",
    color: theme.palette.common.white
  },
  circularProgress: {
    padding: theme.spacing.unit
  },
  fullScreen: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  }
});

const Preloading = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.fullScreen}>
        <div className={classes.logo}>
          <Typography
            variant="display3"
            align="center"
            className={classes.logoText}
          >
            FITWAVE
          </Typography>
          <Typography>LOADING...</Typography>
          <CircularProgress
            className={classes.circularProgress}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Preloading);
