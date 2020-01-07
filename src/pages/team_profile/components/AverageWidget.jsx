import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Scrollbars } from "react-custom-scrollbars";

// component
import { Paper } from "@material-ui/core";
import TableToolbar from "../../../components/TableToolbar.jsx";
import TableCategoryAvg from "../../../components/TableCategoryAvg.jsx";

const styles = theme => ({
  tableAvg: {
    backgroundColor: theme.palette.secondary.dark
  }
});

const AverageWidget = props => {
  const {
    classes,
    HandleClickIndividualMember,
    HandleSelectInputChanges,
    allCategories,
    cat,
    teamData,
    catMembers,
    lang
  } = props;
  return (
    <Paper className={classes.tableAvg} elevation={5}>
      <TableToolbar
        title="AVERAGE"
        SelectInputEvent={HandleSelectInputChanges}
        cat={cat}
        teamData={teamData}
        allCategories={allCategories}
      />
      <Scrollbars style={{ height: 400, borderRadius: "0px 0px 4px 4px" }}>
        <TableCategoryAvg
          categoryMembers={catMembers}
          cat={cat}
          clickEventIndividual={HandleClickIndividualMember}
          lang={lang}
        />
      </Scrollbars>
    </Paper>
  );
};

export default withStyles(styles)(AverageWidget);
