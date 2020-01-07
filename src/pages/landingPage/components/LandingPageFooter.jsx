import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Phone as PhoneIcon, Mail as MailIcon } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: "0"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center"
  },
  footerChildItems: {
    margin: 2,
    display: "flex",
    alignItems: "center"
  },
  footerInfo: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  spacer: {
    flex: "1 1 100%"
  },
  responsiveTextFollowUS: {
    [theme.breakpoints.down("xs")]: {
      width: 60,
      fontSize: 12
    }
  },
  footerRedesSociales: {
    marginRight: theme.spacing.unit * 5,
    width: 125,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing.unit
    }
  },
  icon: {
    marginRight: 4,
    color: theme.palette.common.white,
    fontSize: 12
  },
  instagramIcon: {
    marginLeft: theme.spacing.unit,
    width: 12,
    height: 12
  }
});
const LandingPageFooter = props => {
  const { classes } = props;
  return (
    <footer className={classes.root}>
      <div className={classes.content}>
        <div className={classes.footerInfo}>
          <div className={classes.footerChildItems}>
            <PhoneIcon className={classes.icon} />
            <Typography variant="caption">+507 6286-4816</Typography>
          </div>
          <div className={classes.footerChildItems}>
            <MailIcon className={classes.icon} />
            <Typography variant="caption">info@fitwave507.com</Typography>
          </div>
        </div>
        <div className={classes.spacer} />
        <div className={classes.footerRedesSociales}>
          <Typography
            variant="body1"
            className={classes.responsiveTextFollowUS}
          >
            FOLLOW US
          </Typography>
          <a
            rel="noreferrer noopener"
            href="https://www.instagram.com/fitwave507/"
            target="_blank"
          >
            <img
              src="images/fitware/instagram-64.png"
              alt="instagram"
              className={classes.instagramIcon}
            />
          </a>
        </div>
      </div>
      <div>
        <Typography variant="body1" align="center">
          © Copyright - Fitwave 2018 - ALL RIGHTS RESERVED
        </Typography>
      </div>
    </footer>
  );
};

export default withStyles(styles)(LandingPageFooter);
