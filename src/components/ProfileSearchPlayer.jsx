import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import AuthContext from "../context/context";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
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
  },
  avatarSearch: {
    border: `3px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)",
    color: theme.palette.common.white
  }
});

class ProfileSearchPlayer extends Component {
  state = {
    category: "",
    member: {}
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
  };

  render() {
    const { category, member } = this.state;
    const { classes } = this.props;

    return (
      <AuthContext.Consumer>
        {context => {
          const { state, updateMemberData } = context;
          const { teamData, userData } = state;

          return (
            <div className={classes.root}>
              <SearchIcon />
              <div className={classes.formsActions}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple">Category</InputLabel>
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
                  <InputLabel htmlFor="select-multiple">Player</InputLabel>
                  <Select
                    value={member}
                    onChange={e => {
                      this.HandleOnChangePlayer(e, updateMemberData, userData);
                    }}
                    inputProps={{
                      name: "member",
                      id: "member-id"
                    }}
                  >
                    {category &&
                      teamData.categories[category].members.map(player => (
                        <MenuItem value={player} key={player + 1}>
                          {player.name} {player.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(ProfileSearchPlayer);
