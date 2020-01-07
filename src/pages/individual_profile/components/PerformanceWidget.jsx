import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

// component
import GraphChartCard from "../../../components/GraphChartCard.jsx";
import localizationJSON from "../../../utils/localization";

const styles = theme => ({
  performanceGraphRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark
  },
  performanceGraphHeader: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  performanceGraphBody: {
    padding: theme.spacing.unit
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

const PerformanceWidget = props => {
  const {
    classes,
    HandleSelectInputChanges,
    chartData,
    user,
    test,
    HandleButtonChangeChartData,
    lang,
    fullwidth
  } = props;

  return (
    <Paper className={classes.performanceGraphRoot} elevation={5}>
      <Toolbar className={classes.performanceGraphHeader}>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            {localizationJSON[lang].performanceGraph}#{test}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <FormControl>
            <Select
              value={test}
              onChange={HandleSelectInputChanges}
              inputProps={{
                name: "test",
                id: "test-id"
              }}
            >
              {user.testResults.map((value, key) => (
                <MenuItem
                  value={key + 1}
                  key={value}
                  onClick={event => HandleButtonChangeChartData(value, event)}
                >
                  {value.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
      <div className={classes.performanceGraphBody}>
        <GraphChartCard data={chartData} showTooltip fullwidth={fullwidth} />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(PerformanceWidget);
