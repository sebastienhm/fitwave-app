import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Toolbar, Typography } from "@material-ui/core";

// component
import ImprovementBarChart from "../../../components/ImprovementBarChart.jsx";

// utils
import localizationJSON from "../../../utils/localization";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    flex: "1 1 100%"
  },
  body: {
    padding: theme.spacing.unit
  }
});

const ImprovementWidget = props => {
  const { classes, chartData, lang } = props;
  return (
    <Paper className={classes.root} elevation={5}>
      <Toolbar className={classes.header}>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            {localizationJSON[lang].improvementWidget}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions} />
      </Toolbar>
      <div className={classes.body}>
        <ImprovementBarChart chartData={chartData} />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ImprovementWidget);
