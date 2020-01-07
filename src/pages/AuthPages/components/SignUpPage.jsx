import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  IconButton,
  Checkbox
} from "@material-ui/core";
import {
  MailOutline as EmailOutlineIcon,
  LockOutline as LooksOutlineIcon,
  PersonOutline as PersonOutlineIcon,
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {},
  contentForm: {
    display: "flex",
    flexDirection: "column"
  }
});

class SignUpPage extends Component {
  state = {
    password: "",
    showPassword: false,
    rememberMeChecked: true
  };

  // maneja el cheked
  HandleChangeChecked = prop => event => {
    this.setState({ [prop]: event.target.checked });
  };

  // maneja el cambio de los textbox
  HandleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  // maneja el click
  HandleMouseDownPassword = event => {
    event.preventDefault();
  };

  // una vez que se hace click se cambia true o false
  HandleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { showPassword, password, rememberMeChecked } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Typography variant="title">Sign Up</Typography>
        <form className={classes.contentForm}>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="email" type="email">
              Email
            </InputLabel>
            <Input
              id="email"
              placeholder="Pedro123@correo.com"
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlineIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="username" type="text">
              Username
            </InputLabel>
            <Input
              id="username"
              placeholder="Pedro123"
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              placeholder="P@ss123"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={this.HandleChange("password")}
              startAdornment={
                <InputAdornment position="start">
                  <LooksOutlineIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.HandleClickShowPassword}
                    onMouseDown={this.HandleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div
            style={{
              marginTop: "20px",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMeChecked}
                  onChange={this.HandleChangeChecked("rememberMeChecked")}
                  value="rememberMeChecked"
                />
              }
              label="RememberMe"
            />
            <Button type="submit" variant="contained" color="secondary">
              SignUp
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(SignUpPage);
