import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import Media from "react-media";

import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

// components
import ModalReviews from "../../../components/ModalReview.jsx";
import MobileModalReviews from "../../../components/mobileModalReview.jsx";

// utils
import localizationJSON from "../../../utils/localization";

/**
 * El estilo de este componente
 */
const imgTeamLogoContainerSize = 120;
const styles = theme => ({
  paperRoot: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.dark,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  displayInfoContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  displayInfo: {
    margin: theme.spacing.unit
  },
  imgTeamLogoContainer: {
    margin: theme.spacing.unit,
    height: imgTeamLogoContainerSize,
    width: imgTeamLogoContainerSize,
    borderRadius: "50%",
    background: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `5px solid ${theme.palette.primary.main}`,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  imgTeamLogo: {
    width: 75
  },
  OVR: {
    padding: theme.spacing.unit,
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
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  }
});

const teamHeader = props => {
  const {
    classes,
    teamName,
    totalMembers,
    modalOpen,
    closeModalEvent,
    openModalEvent,
    teamData,
    updateReviews,
    lang
  } = props;

  const capitalizedTeamName = teamName.replace(/^\w/, c => c.toUpperCase());
  const teamOverall = teamData.allMembers.catStats.overall;

  return (
    <Paper className={classes.paperRoot} elevation={5}>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item sm={12} md={9} lg={10}>
          <div className={classes.displayInfoContainer}>
            <Paper className={classes.imgTeamLogoContainer}>
              <CloudinaryContext cloudName="hdkwrkhs8">
                <Image
                  publicId={`teams/${teamName}/${teamName}.png`}
                  className={classes.imgTeamLogo}
                >
                  <Transformation quality="auto" />
                </Image>
              </CloudinaryContext>
            </Paper>
            <div>
              <Typography variant="display1">{capitalizedTeamName}</Typography>
              <Typography variant="body1">
                {localizationJSON[lang].playerCount}: {totalMembers}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={3} lg={2}>
          <div className={classes.actions}>
            <Button
              onClick={openModalEvent}
              variant="contained"
              color="primary"
            >
              {localizationJSON[lang].reviewButton}
            </Button>
            <Media query="(min-width: 471px)">
              {matches =>
                matches ? (
                  <ModalReviews
                    lang={lang}
                    teamData={teamData}
                    modalOpen={modalOpen}
                    HandleCloseModal={closeModalEvent}
                    teamName={teamName}
                    updateReviews={updateReviews}
                  />
                ) : (
                  <MobileModalReviews
                    lang={lang}
                    teamData={teamData}
                    modalOpen={modalOpen}
                    HandleCloseModal={closeModalEvent}
                    teamName={teamName}
                    updateReviews={updateReviews}
                  />
                )
              }
            </Media>
            <div className={classes.OVR}>
              <Typography variant="title" align="center">
                OVR
              </Typography>
              <Paper className={classes.overall}>
                {teamOverall}
                /99
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

// props validations
teamHeader.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(teamHeader);
