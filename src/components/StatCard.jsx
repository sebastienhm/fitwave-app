import React from "react";
import {
  LinearProgress,
  Paper,
  Chip,
  Avatar,
  Typography,
  Toolbar,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import cloudinary from "cloudinary-core";

// utils
import localizationJSON from "../utils/localization";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "hdkwrkhs8",
  secure: true
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark
  },
  toolbarHeader: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  chip: {
    backgroundColor: theme.palette.secondary.dark
  },
  avatar: {
    border: `3px solid ${theme.palette.primary.dark}`,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)"
  },
  body: {
    height: 341,
    padding: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

/**
 * This renders a Card that displays a stat
 */
const StatCard = props => {
  const { classes, stats, user, teamName, lang } = props;

  // normalize to 0 - 100
  const Normalize = value => {
    if (value == 99) {
      return 100;
    }
    return ((value - 0) * 100) / (100 - 0);
  };

  // para sacar el overall se hace un promedio.
  const GetPromedio = values => {
    const newArray = values.map(element => +element.val);
    const sum = newArray.reduce((total, value) => total + value);
    return (sum / values.length).toFixed(0);
  };

  const fullName =
    user.name.replace(/\s/g, "") + user.lastName.replace(/\s/g, "");

  const imageURL = cloudinaryCore.url(
    `teams/${teamName}/miembros/${fullName}.png`
  );

  return (
    <Paper className={classes.root} elevation={5}>
      <Toolbar className={classes.toolbarHeader}>
        <div className={classes.title}>
          <Typography variant="title">
            {localizationJSON[lang].playerCardWidget}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Chip
            className={classes.chip}
            avatar={
              <Avatar
                className={classes.avatar}
                src={imageURL}
                onError={e => {
                  e.target.src = "/images/fitware/silueta.png";
                }}
              />
            }
            label={`OVR ${GetPromedio(stats)} `}
          />
        </div>
      </Toolbar>
      <div className={classes.body}>
        <div className={classes.content}>
          {stats.map((element, index) => {
            const key = `${element}${index}`;
            return (
              <div
                style={{
                  margin: 8,
                  width: "100%"
                }}
                key={key}
              >
                <Grid container spacing={16} alignItems="center">
                  <Grid item xs={4} md={2}>
                    <Typography variant="button" align="center">
                      {element.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={9}>
                    <LinearProgress
                      style={{
                        marginLeft: -8,
                        height: 20
                      }}
                      color="primary"
                      variant="determinate"
                      value={Normalize(element.val)}
                    />
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Typography variant="headline" align="left">
                      {element.val}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StatCard);
