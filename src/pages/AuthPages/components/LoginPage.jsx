import React, { Component } from "react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Typography,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {
  MailOutline as EmailOutlineIcon,
  VisibilityOff as VisibilityOffIcon
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { compose } from "recompose";
import globalConfig from "../../../utils/config";

const styles = theme => ({
  content: {},
  contentForm: {
    display: "flex",
    flexDirection: "column"
  }
});

class LoginPage extends Component {
  // states
  state = {
    username: "",
    password: "",
    validation: false,
    errorSubmit: false,
    passwordDialogOpen: false,
    forgotPasswordEmail: "",
    response: {
      content: ""
    }
  };

  // Handle ChangeData
  HandleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  HandleOpenClickForgotPassword = () => {
    this.setState({
      passwordDialogOpen: true
    });
  };

  HandleCloseClickForgotPassword = () => {
    this.setState({
      passwordDialogOpen: false
    });
  };

  // Maneja el login
  HandleSubmit = e => {
    const { username, password } = this.state;
    const { history, loginEvent } = this.props;

    // verificar si los campos de email y password estan vacios
    if (username == "" && password == "") {
      this.setState({
        validation: true
      });
    } else {
      // HTTP REQUEST
      Axios({
        method: "post",
        url: `${globalConfig.API_URL}/login`,
        data: qs.stringify({ username, password })
      })
        .then(result => {
          // if result loginFailed == true
          if (result.data.loginFailed) {
            // set errorSubmit true
            this.setState({
              errorSubmit: true
            });
          } else {
            loginEvent(result.data);
            // if the user is type of player
            if (result.data.userData.userType == "player") {
              // redirect to his dashboard
              history.push(`/player/${result.data.userData.username}`);
            } else {
              // other case redirect to dashboard of team
              history.push(`/team/${result.data.userData.team}`);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    e.preventDefault();
  };

  HandlePasswordResetSubmit = e => {
    const { forgotPasswordEmail } = this.state;
    Axios({
      method: "post",
      url: `${globalConfig.API_URL}/request-password-reset`,
      data: qs.stringify({ email: forgotPasswordEmail })
    })
      .then(result => {
        this.setState({
          response: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
    this.HandleCloseClickForgotPassword();
  };

  render() {
    const {
      username,
      password,
      validation,
      errorSubmit,
      fullScreen,
      response,
      passwordDialogOpen
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Typography variant="title">Login</Typography>
        <form className={classes.contentForm} onSubmit={this.HandleSubmit}>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="username" type="text">
              Username
            </InputLabel>
            <Input
              name="username"
              id="username"
              value={username}
              onChange={this.HandleOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <EmailOutlineIcon />
                </InputAdornment>
              }
            />
            <FormHelperText id="username-helper">
              <Typography variant="caption" color="primary">
                {validation ? "This field is Required" : ""}
              </Typography>
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={this.HandleOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <VisibilityOffIcon />
                </InputAdornment>
              }
            />
            <FormHelperText id="password-helper">
              <Typography variant="caption" color="primary">
                {validation ? "This field is Required" : ""}
              </Typography>
            </FormHelperText>
          </FormControl>
          <div
            style={{
              marginTop: "20px",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="text"
              color="primary"
              style={{ fontSize: "11px" }}
              onClick={this.HandleOpenClickForgotPassword}
            >
              Forgot Password?
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={passwordDialogOpen}
              onClose={this.HandleCloseClickForgotPassword}
            >
              <DialogTitle id="form-forgotPassword-title">
                Forgot Password
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Enter your Email</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="forgotPasswordEmail"
                  id="forgotPasswordEmail"
                  label="Email Address"
                  type="email"
                  onChange={this.HandleOnChange}
                  fullWidth
                />
                <DialogContentText>{response.content}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.HandleCloseClickForgotPassword}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.HandlePasswordResetSubmit}
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
        <div>
          {errorSubmit ? (
            <Typography variant="caption" color="primary" align="center">
              Invalid email or password
            </Typography>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(LoginPage);
