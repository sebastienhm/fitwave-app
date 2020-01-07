import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import qs from "query-string";
import {
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import { LockOutline as LockIcon } from "@material-ui/icons";
import Config from "../../../utils/config";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: ""
    };
  }

  HandleChangeField = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  HandleSubmitResetPassword = event => {
    const { history, accessToken } = this.props;
    const { confirmPassword, newPassword } = this.state;

    const URL = `${
      Config.API_URL
    }/api/usersModel/reset-password?access_token=${accessToken}`;

    if (confirmPassword === newPassword) {
      Axios({
        method: "post",
        url: URL,
        data: qs.stringify({
          newPassword: confirmPassword
        })
      })
        .then(response => {
          history.location.push("/");
        })
        .catch(err => console.log("error", err));
    }
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Reset Password</Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="new-Passoword">New Password</InputLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={this.HandleChangeField}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Confirm-password">
                Confirm password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={this.HandleChangeField}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.HandleSubmitResetPassword}
              className={classes.submit}
            >
              submit
            </Button>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
