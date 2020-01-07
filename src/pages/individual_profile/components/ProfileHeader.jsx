import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Paper } from "@material-ui/core";

import cloudinary from "cloudinary-core";
import localizationJSON from "../../../utils/localization";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "hdkwrkhs8",
  secure: true
});
/**
 * El estilo de este componente
 */
const imgAvatarSize = 120;
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.dark
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: imgAvatarSize,
    height: imgAvatarSize,
    border: `5px solid ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  imageDisplay: {
    textAlign: "center"
  },
  dataDisplay: {
    padding: "26px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "26px !important",
      textAlign: "center"
    }
  },
  OVR: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  overall: {
    width: 90,
    height: 80,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Exo, sans-serif",
    fontWeight: 700,
    color: "#FFF",
    fontSize: "25px",
    textShadow: "#FFF 0 0 10px",
    textAlign: "center"
  }
});

/**
 * This component displays the main stats for the individual athlete, as well as their picture.
 */
const ProfileHeader = props => {
  const { classes, user, teamName, lang } = props;

  const currentOverall = user.testResults[user.testResults.length - 1].overall;
  const fullName =
    user.name.replace(/\s/g, "") + user.lastName.replace(/\s/g, "");

  const newImageUrl = cloudinaryCore.url(
    `teams/${teamName}/miembros/${fullName}.png`
  );

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid
        container
        spacing={16}
        alignItems="center"
        justify="center"
        direction="row"
      >
        <Grid item sm={12} md={2} className={classes.imageDisplay}>
          <Avatar
            src={newImageUrl}
            onError={e => {
              e.target.src = "/images/fitware/silueta.png";
            }}
            alt="Logo foto"
            className={classes.avatar}
          />
        </Grid>
        <Grid item sm={12} md={8} className={classes.dataDisplay}>
          <Typography variant="display1">
            {user.name} {user.lastName}
          </Typography>
          <Typography variant="display1">{user.teamName}</Typography>
          <Typography>{user.cat}</Typography>
          <Typography>
            {user.pos ? user.pos : "VOL"} | {localizationJSON[lang].ageText} :{" "}
            {user.age} <br />
            Height: {user.height} | Weight: {user.weight} | BFP: {user.bfp}
          </Typography>
        </Grid>
        <Grid item sm={12} md={2}>
          <div className={classes.OVR}>
            <Typography variant="title" align="center">
              OVR
            </Typography>
            <Paper className={classes.overall}>
              {currentOverall}
              /99
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(ProfileHeader);
