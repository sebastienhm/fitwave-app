import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
  Paper
} from "@material-ui/core";
import PropTypes from "prop-types";

// responsive
import Media from "react-media";

// context
import AuthContext from "../../context/context";

// components
import LoginPage from "./components/LoginPage.jsx";

const backgroundImgSrc = "images/fitware/jake-kokot-634567-unsplash.jpg";
const coverImgScr = "images/fitware/IMG-4914.jpg";
const styles = theme => ({
  container: {
    background: `linear-gradient(
      rgba(0, 0, 0, 0.45), 
      rgba(0, 0, 0, 0.45)
    ), url(${backgroundImgSrc}) no-repeat center center fixed`,
    backgroundSize: "cover",
    position: "relative",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    padding: 16,
    margin: "5% auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16
  },
  title: {
    fontFamily: "Impact, Charcoal, sans-serif"
  },
  logo: {
    height: 150,
    width: 150
  },
  card: {
    display: "flex",
    backgroundColor: theme.palette.secondary.dark
  },
  details: {
    minWidth: 400,
    display: "flex",
    flexDirection: "column"
  },
  cover: {
    background: ` linear-gradient(
      rgba(0, 0, 255, 0), rgba(0, 0, 30, 0.7)
    ), url(${coverImgScr}) no-repeat center center`,
    backgroundSize: "cover",
    width: 400,
    height: 550
  },
  mobileLogin: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.dark
  }
});

const loginScreenPage = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Media query="(min-width: 800px)">
        {matches =>
          matches ? (
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent>
                  <div className={classes.header}>
                    <img src="/images/fitware/Asset 20.png" alt="logo" />
                  </div>
                  <AuthContext.Consumer>
                    {context => {
                      const { loginEvent } = context;
                      return <LoginPage loginEvent={loginEvent} />;
                    }}
                  </AuthContext.Consumer>
                </CardContent>
                <Divider />
                <div className={classes.footer}>
                  <Typography variant="caption">
                    Fitwave @ 2018. All Rights Reserved.
                  </Typography>
                </div>
              </div>
              <CardMedia className={classes.cover} src={coverImgScr} />
            </Card>
          ) : (
            <Paper className={classes.mobileLogin} elevation={5}>
              <div className={classes.header}>
                <img src="/images/fitware/Asset 20.png" alt="logo" />
              </div>
              <AuthContext.Consumer>
                {context => {
                  const { loginEvent } = context;
                  return <LoginPage loginEvent={loginEvent} />;
                }}
              </AuthContext.Consumer>
              <Divider />
              <div className={classes.footer}>
                <Typography variant="caption">
                  Fitwave @ 2018. All Rights Reserved.
                </Typography>
              </div>
            </Paper>
          )
        }
      </Media>
    </div>
  );
};

loginScreenPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(loginScreenPage);
