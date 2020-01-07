import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

// Components
import { Scrollbars } from "react-custom-scrollbars";
import { Paper } from "@material-ui/core";
import TableCategory from "../../../components/TableCategory.jsx";
import TableToolbar from "../../../components/TableToolbar.jsx";

// utils
import localizationJson from "../../../utils/localization";

/**
 * El estilo de este componente
 */
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  }
});

class teamTableDisplay extends Component {
  // el state interno del componente
  constructor(props) {
    super(props);

    // set initial STATES
    const { teamData } = props;

    const categories = [];

    Object.keys(teamData.categories).forEach(category => {
      categories.push({
        name: category,
        members: teamData.categories[category].members
      });
    });

    const allCategories = [
      {
        name: "todos",
        members: teamData.allMembers.members
      },
      ...categories
    ];

    this.state = {
      allCategories,
      currentCategory: allCategories[0].name,
      currentCategoryMembers: allCategories[0].members
    };
  }

  // controla cuando hay cambios en el select
  HandleSelectInputChanges = event => {
    const { allCategories } = this.state;

    const GetCategoryData = allCategories.filter(
      value => value.name === event.target.value
    );

    this.setState({
      [event.target.name]: event.target.value,
      currentCategoryMembers: GetCategoryData[0].members
    });
  };

  render() {
    const {
      currentCategory,
      currentCategoryMembers,
      allCategories
    } = this.state;
    const { classes, lang } = this.props;

    return (
      <Paper className={classes.root} elevation={5}>
        <TableToolbar
          title={localizationJson[lang].tableGroupStats}
          SelectInputEvent={this.HandleSelectInputChanges}
          cat={currentCategory}
          allCategories={allCategories}
        />
        <Scrollbars style={{ height: 400, borderRadius: "0px 0px 4px 4px" }}>
          <TableCategory
            categoryMembers={currentCategoryMembers}
            cat={currentCategory}
            lang={lang}
          />
        </Scrollbars>
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(teamTableDisplay);
