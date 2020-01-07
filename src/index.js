import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import App from "./App.jsx";
import registerServiceWorker from "./registerServiceWorker";
// provider
import UserAuthProvider from "./providers/userAuthProvider.jsx";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff340e",
      light: "#ff9581",
      dark: "#4b1f17"
    },
    secondary: {
      main: "#18a0e8",
      light: "#88d5ff",
      dark: "#102530"
    },
    background: {
      customBackground: "#eff7fc"
    },
    type: "dark"
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    display1: {
      color: "white"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <UserAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserAuthProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
