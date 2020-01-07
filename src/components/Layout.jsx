import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

// Componentes
import MainMenu from "./MainMenu.jsx";

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.customBackground,
    padding: theme.spacing.unit * 2
  }
});

const Layout = props => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainMenu />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Layout);
