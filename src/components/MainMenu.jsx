import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import PropTypes from "prop-types";

// Material UI
import {
  Drawer,
  Hidden,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Divider
} from "@material-ui/core";

// Materila UI Icons
import {
  Dashboard as DashboardIcon,
  Menu as MenuIcon
} from "@material-ui/icons";

// components
import Media from "react-media";
import SearchBar from "./ProfileSearchPlayer.jsx";
import MobileSearchBar from "./MobileSearchPlayer.jsx";

// context
import AuthContext from "../context/context";

const logoFitwave = "/images/fitware/Asset10.png";

const drawerWidth = 180;
const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  navIconHide: {
    // oculta el icono cuando se ve en desktop
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.dark
  },
  toolbarTitle: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center"
  },
  toolbarSpacer: {
    flex: "1 1 100%"
  },
  toolbarActions: {
    flex: "0 0 auto"
  }
});

class MainMenu extends Component {
  state = {
    mobileOpen: false
  };

  // maneja cuando el viewport este en moviles
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  HandleMenuButtons = () => {
    const { history, match } = this.props;

    if (!match.isExact) {
      history.push(`${match.url}`);
    }
    this.setState(prevState => ({ mobileOpen: false }));
  };

  render() {
    const { classes, match } = this.props;
    const { mobileOpen } = this.state;

    const searchBar = (
      <AuthContext.Consumer>
        {context => {
          const { state } = context;
          if (
            match.url !== this.props.location.pathname &&
            state.userData.userType === "teamOwner"
          ) {
            return (
              <Media query="(min-width: 490px)">
                {matches => (matches ? <SearchBar /> : <MobileSearchBar />)}
              </Media>
            );
          }
        }}
      </AuthContext.Consumer>
    );

    // se crea componente para mostrar u ocultar el menu.
    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <Divider />
        <MenuList>
          <MenuItem
            className={classes.menuItem}
            onClick={this.HandleMenuButtons}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText inset primary="Dashboard" />
          </MenuItem>
        </MenuList>
      </div>
    );

    return (
      <Fragment>
        <AppBar position="fixed" className={classes.appBar} color="primary">
          <Toolbar>
            <div className={classes.toolbarTitle}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <img src={logoFitwave} alt="logo" />
            </div>
            <div className={classes.toolbarSpacer} />
            <div className={classes.toolbarActions}>{searchBar}</div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <div className={classes.containerDrawerPaper}>
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </div>
          </Hidden>
        </nav>
      </Fragment>
    );
  }
}

// Prop Validation
MainMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter
)(MainMenu);
