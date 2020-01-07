import React from "react";
import { Typography, Paper, LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  BarChart,
  CartesianGrid,
  Line,
  ReferenceLine
} from "recharts";
import FunctionHelper from "../utils/functionHelper.jsx";

const badgeSize = 100;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark,
    // display: "flex",
    height: "auto",
    margin: "20px 0"
  },
  customBadge: {
    height: badgeSize,
    width: badgeSize,
    color: "#FFF",
    fontSize: "25px",
    backgroundColor: theme.palette.primary.main,
    textShadow: "#FFF 0 0 10px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: `${theme.shape.borderRadius}px 0px 0px ${
      theme.shape.borderRadius
      }px`
  },
  body: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    // display: "flex",
    flexDirection: "column"
  },
  contentTitle: {
    alignSelf: "flex-start"
  },
  linearProgress: {
    marginLeft: -8,
    marginRight: -8
  },
  contentFooter: {
    alignSelf: "flex-end"
  },
  header: {
    // display: "flex"
    padding: "20px",
    minHeight: "20px",
    // margin: "20px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
      }px 0px 0px`
  },
  spacer: {
    flex: "1 1 100%"
  },
  rootTooltip: {
    flexGrow: 1
  },
  paperBackground: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.common.white
  }
});

const CustomTooltip = props => {
  const { active } = props;

  if (active) {
    const { payload, label, classes, val } = props;

    return (
      <div className={classes.rootTooltip}>
        <Paper className={classes.paperBackground}>
          <Typography color="primary">
            {`Score: ${payload[0].value}`}
          </Typography>
          <Typography color="primary">{`Result : ${
            payload[0].payload.result
            }`}</Typography>
        </Paper>
      </div>
    );
  }
  return <div />;
};

function secondsToMinutes(time) {
  return `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
}

const CustomToolTip = withStyles(styles)(CustomTooltip);

const CustomCard = props => {
  const { classes, data, maxMin, showTooltip } = props;
  let { title } = props;

  // normalize to 0 - 100
  // const Normalize = value => {
  //   if (value == 99) {
  //     return 100;
  //   }
  //   return ((value - 0) * 100) / (100 - 0);
  // };

  let allData = data[0];

  for (let i = 1; i < data.length; i += 1) {
    allData = data[0].concat(data[i]);
  }

  const filterData = allData.filter(res => title === res.name);

  let max = 0;
  let min = 0;

  switch (title) {
    case "Agility":
      max = `${maxMin.AgilityMax} s`;
      min = `${maxMin.AgilityMin} s`;
      title = "Agility: 3 Cone Test";
      break;
    case "Jump":
      max = `${maxMin.LongJumpMax} m`;
      min = `${maxMin.LongJumpMin} m`;
      title = "Lower Body: Broad Jump";
      break;
    case "Speed":
      max = `${maxMin["40ydMax"]} s`;
      min = `${maxMin["40ydMin"]} s`;
      title = "Speed: 40 Yd Dash";
      break;
    case "Endurance":
      max = `${FunctionHelper.FormatBeepTest(maxMin.BeepTestMax)}`;
      min = `${FunctionHelper.FormatBeepTest(maxMin.BeepTestMin)}`;
      title = "Endurance: Beep Test";
      break;
    case "Toss":
      max = `${maxMin.BallTossMax} m`;
      min = `${maxMin.BallTossMin} m`;
      title = "Upper Body: Ball Toss";
      break;
    case "Core":
      max = `${secondsToMinutes(maxMin.PlankHoldMax)} min`;
      min = `${secondsToMinutes(maxMin.PlankHoldMin)} min`;
      title = "Core: Plank Hold";
      break;
    default:
      break;
  }

  return (
    <Paper className={classes.root} elevation={5}>
      <div className={classes.header}>
        <Typography variant="title" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <ResponsiveContainer width="100%" height={325}>
        <AreaChart
          data={filterData}
          margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
        >
          <Area
            type="linear"
            dataKey="val"
            stroke="#ff340e"
            strokeWidth={2}
            dot
            fill="rgba(255, 52, 14,0.1)"
          />
          <XAxis
            dataKey="date"
            stroke="#fff"
            tickMargin={10}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            type="number"
            domain={[0, 100]}
            interval={0}
            stroke="#fff"
            tickMargin={10}
            padding={{ left: 20, right: 20 }}
          />
          <ReferenceLine
            y={100}
            stroke="white"
            label={{
              value: `Fitwave Max ${max}`,
              fill: "#fff",
              position: "insideTopRight"
            }}
          />
          <ReferenceLine
            y={10}
            stroke="white"
            label={{
              value: `Fitwave Min ${min}`,
              fill: "#fff",
              position: "insideBottomRight"
            }}
          />
          <Tooltip content={showTooltip && <CustomToolTip />} />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default withStyles(styles)(CustomCard);
