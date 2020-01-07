import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

// context      
import { compose } from "recompose";
import AuthContext from "../context/context";

// styles
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main
  },
  dialogContent: {
    backgroundColor: theme.palette.secondary.dark
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  formsActions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  }
});

class MobileSearchPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      member: {},
      openMobile: false
    };
  }

  // Open Menu Search
  HandleOpenSearchMenu = () => {
    this.setState(state => ({ openMobile: true }));
  };

  // Close Menu Search
  HandleClose = () => {
    this.setState(state => ({ openMobile: false }));
  };

  HandleSelectChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  HandleOnChangePlayer = (event, updateMemberData, userData) => {
    const { history } = this.props;

    this.setState({
      [event.target.name]: event.target.value
    });

    updateMemberData(event.target.value);

    history.push(
      `/team/${userData.team}/individual/${event.target.value.name}`
    );
    this.HandleClose();
  };

  render() {
    const { openMobile, category, member } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <IconButton onClick={this.HandleOpenSearchMenu}>
          <SearchIcon />
        </IconButton>
        <Dialog open={openMobile} onClose={this.HandleClose}>
          <DialogTitle className={classes.dialogTitle}>
            <SearchIcon /> {"Search Player"}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <AuthContext.Consumer>
              {context => {
                const { state, updateMemberData } = context;
                const { teamData, userData } = state;

                return (
                  <div className={classes.root}>
                    <div className={classes.formsActions}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple">
                          Category
                        </InputLabel>
                        <Select
                          value={category}
                          onChange={this.HandleSelectChange}
                          inputProps={{
                            name: "category",
                            id: "category-id"
                          }}
                        >
                          {Object.keys(teamData.categories).map(cat => (
                            <MenuItem value={cat} key={cat}>
                              {cat}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple">
                          Player
                        </InputLabel>
                        <Select
                          value={member}
                          onChange={e => {
                            this.HandleOnChangePlayer(
                              e,
                              updateMemberData,
                              userData
                            );
                          }}
                          inputProps={{
                            name: "member",
                            id: "member-id"
                          }}
                        >
                          {category &&
                            teamData.categories[category].members.map(
                              player => (
                                <MenuItem value={player} key={player + 1}>
                                  {player.name} {player.lastName}
                                </MenuItem>
                              )
                            )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                );
              }}
            </AuthContext.Consumer>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(MobileSearchPlayer);
