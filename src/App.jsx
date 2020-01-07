import React from "react";
import qs from "query-string";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// pages
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import LoginPage from "./pages/AuthPages/LoginScreen.jsx";
import SignUpPage from "./pages/AuthPages/components/SignUpPage.jsx";
import MainApp from "./components/MainApp.jsx";
import PlayerProfile from "./pages/individual_profile/playerProfile.jsx";
import ForgotPassword from "./pages/AuthPages/components/forgotPassword.jsx";

// Component
import PrivateRoute from "./components/PrivateRoute.jsx";

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const {
        location: { search }
      } = props;
      const querySearch = qs.parse(search);

      if (Object.keys(querySearch).length > 0) {
        if (
          querySearch.access_token != "" &&
          querySearch.access_token != undefined
        ) {
          return (
            <Component {...props} accessToken={querySearch.access_token} />
          );
        }
      }
      return <Redirect to={{ pathname: "/" }} />;
    }}
  />
);

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignUpPage} />
    <PrivateRoute path="/team/:teamid" component={MainApp} />
    <PrivateRoute path="/player/:memberid" component={PlayerProfile} />
    <CustomRoute path="/reset-password" component={ForgotPassword} />
  </Switch>
);

export default App;
