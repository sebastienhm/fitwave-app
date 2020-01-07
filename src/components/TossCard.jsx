/* eslint-disable radix */
import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Media from "react-media";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const styles = theme => ({
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
    const { payload, label, classes } = props;

    return (
      <div className={classes.rootTooltip}>
        <Paper className={classes.paperBackground}>
          <Typography color="primary">
            {`${label} : ${payload[0].value}`}
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

const CustomToolTip = withStyles(styles)(CustomTooltip);

class GraphChartCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("resize", this.HandleRezise);
  }

  HandleRezise = e => {
    const { fullwidth } = this.props;
    const windowsSize = window.innerWidth;
    const containerSize = fullwidth
      ? (windowsSize > 960 && parseInt(windowsSize * 0.8)) ||
        parseInt(windowsSize * 0.95)
      : (windowsSize <= 960 && parseInt(windowsSize * 0.9)) || "100%";

    this.setState({ windowsSize, containerSize });
  };

  render() {
    const { containerSize } = this.state;
    const { data, showTooltip } = this.props;

    const height = 325;
    const mobileHeight = 200;

    return (
      <Fragment>
        <Media query="(min-width: 490px)">
          {matches =>
            matches ? (
              <ResponsiveContainer width={containerSize} height={height}>
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
                >
                  <Area
                    type="linear"
                    dataKey="value"
                    stroke="#ff340e"
                    strokeWidth={2}
                    dot
                    fill="rgba(255, 52, 14,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#fff"
                    tickMargin={10}
                    padding={{ left: 0, right: 20 }}
                  />
                  <YAxis
                    type="number"
                    domain={[0, 100]}
                    interval={0}
                    stroke="#fff"
                    tickMargin={10}
                  />
                  <Tooltip content={showTooltip && <CustomToolTip />} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width={containerSize} height={mobileHeight}>
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 30, left: -30, bottom: 10 }}
                >
                  <Area
                    type="linear"
                    dataKey="value"
                    stroke="#ff340e"
                    strokeWidth={2}
                    dot
                    fill="rgba(255, 52, 14,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#fff"
                    tickMargin={10}
                    minTickGap={-10}
                    padding={{ left: 0, right: 5 }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    type="number"
                    domain={[0, 100]}
                    interval={0}
                    stroke="#fff"
                    tickMargin={2}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={showTooltip && <CustomToolTip />} />
                </AreaChart>
              </ResponsiveContainer>
            )
          }
        </Media>
      </Fragment>
    );
  }
}

export default withStyles(styles)(GraphChartCard);
