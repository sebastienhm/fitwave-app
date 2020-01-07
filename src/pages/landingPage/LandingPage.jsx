import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// component
import LandingPageFooter from "./components/LandingPageFooter.jsx";
import LandingPageHeader from "./components/LandingPageHeader.jsx";

const backgroundImgSrc = "images/fitware/Asset60.jpg";
const fitwaveLogo = "images/fitware/LogoFitwave0.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    // minHeight: "100vh",
    position: "relative"
  },
  landingMain: {
    flexGrow: 1,
    // marginTop: 57,
    // padding: theme.spacing.unit * 3,
    background: `linear-gradient(
      rgba(0, 0, 0, 0.45), 
      rgba(0, 0, 0, 0.45)
    ), url(${backgroundImgSrc}) no-repeat center center fixed`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    margin: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  fitwaveLogo: {
    width: "auto",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      height: 100
    }
  },
  logoText: {
    fontFamily: "Exo, sans-serif",
    fontWeight: 900,
    fontStyle: "italic",
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30
    }
  },
  textEXO: {
    fontFamily: "Exo, sans-serif",
    fontWeight: 900,
    fontStyle: "italic",
    [theme.breakpoints.down("xs")]: {
      fontSize: 25
    }
  },
  footerContainer: {
    margin: theme.spacing.unit * 3
    // position: "absolute",
    // bottom: "0"
  }
});

const LandingPage = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <LandingPageHeader />
      <div className={classes.landingMain}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={fitwaveLogo} alt="logo" className={classes.fitwaveLogo} />
            <Typography
              variant="display3"
              align="center"
              className={classes.logoText}
            >
              FITBOARD
            </Typography>
          </div>
          <div className={classes.contentText}>
            <Typography
              variant="display3"
              align="center"
              color="primary"
              className={classes.textEXO}
            >
              GESTIÓN INTEGRAL DEL
              <br />
              RENDIMIENTO DEPORTIVO <br />
            </Typography>
            <br />
            <Typography variant="display1" align="center">
              ERES USUARIO DE NUESTRA PLATAFORMA?
            </Typography>
          </div>
          <div className={classes.footerContainer}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Ingresa Aquí
            </Button>
          </div>
        </div>
      </div>
      <LandingPageFooter />
    </div>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(LandingPage);
