import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const fitwaveHeaderLogo = "images/fitware/Asset10.png";
const styles = theme => ({
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    width: 200
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      width: 100,
      fontSize: 10
    }
  }
});

const LandingPageHeader = props => {
  const { classes } = props;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className={classes.title}>
          <img src={fitwaveHeaderLogo} alt="logo" />
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Button
            className={classes.button}
            variant="contained"
            component={Link}
            to="/login"
          >
            Ingresa Aquí
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(LandingPageHeader);
