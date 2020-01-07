import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Toolbar, Typography } from "@material-ui/core";

// Components
import GraphChartCard from "../../../components/GraphChartCard.jsx";

import localizationJSON from "../../../utils/localization";

const styles = theme => ({
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  graphCardRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark,
    [theme.breakpoints.up("md")]: {
      height: 433.5
    }
  },
  graphCardHeader: {
    minHeight: 89.5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  graphCardBody: {
    padding: theme.spacing.unit,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  graphCard: {
    flexGrow: 1
  },
  customBadge: {
    width: 50,
    height: 50,
    color: "#FFF",
    fontSize: "25px",
    background: theme.palette.secondary.dark,
    textShadow: "#FFF 0 0 10px",
    textAlign: "center",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const AverageGraphWidget = props => {
  const { classes, currentCategoryAverage, data, lang } = props;
  return (
    <Paper className={classes.graphCardRoot} elevation={5}>
      <Toolbar className={classes.graphCardHeader}>
        <div className={classes.title}>
          <Typography variant="title" className={classes.contentTitle}>
            {localizationJSON[lang].graphCategoryAverage}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Typography align="center">OVR</Typography>
          <Paper className={classes.customBadge} elevation={5}>
            {currentCategoryAverage}
          </Paper>
        </div>
      </Toolbar>
      <div className={classes.graphCardBody}>
        <GraphChartCard data={data} className={classes.graphCard} />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(AverageGraphWidget);
