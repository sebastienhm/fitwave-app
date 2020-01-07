import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CustomCard from "./CustomCard.jsx";

import FunctionHelper from "../utils/functionHelper.jsx";

const styles = theme => ({
  root: {
    // flexGrow: 1
  }
});

// component for rendering all the 6 other widgets
const FormulaCards = props => {
  const { currentStats, user, classes, GetCurrentStats, baseRange } = props;

  // get user.testResults then compare both on its respective widgets
  const graphData = [];
  for (let i = 0; i < user.testResults.length; i += 1) {
    graphData.push(GetCurrentStats(user.testResults[i]));
  }

  const maxMin = FunctionHelper.GetBasePerformanceRange(user.age, user.sex);

  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        {graphData[0].map((stat, index) => {
          const key = `${stat} | ${index}`;
          return (
            <Grid item xs={12} md={6} key={key}>
              <CustomCard
                key={stat.name}
                title={stat.name}
                data={graphData}
                maxMin={maxMin}
                showTooltip
                // overall={stat.val}
                // result={stat.result}
                // formula={
                //   stat.name === "Endurance" ? user.formulas.beepTest : ""
                // }
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(FormulaCards);
