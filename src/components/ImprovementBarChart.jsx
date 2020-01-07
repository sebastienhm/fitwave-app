/* eslint-disable radix */
import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";

import Media from "react-media";

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
            {`${label} : ${payload[0].value}%`}
          </Typography>
        </Paper>
      </div>
    );
  }
  return <div />;
};

const customLabel = props => {
  const { x, y, width, height, value } = props;
  const xh = x + width / 2;
  const yv = height < 0 ? y + 10 : y - 10;

  return (
    <g>
      <text
        x={xh}
        y={yv}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

const mobileCustomLabel = props => {
  const { x, y, width, height, value } = props;
  const xh = x + width / 2;
  const yv = height < 0 ? y + 10 : y - 10;

  return (
    <g>
      <text
        x={xh}
        y={yv}
        fill="#fff"
        fontSize={10}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

const CustomToolTip = withStyles(styles)(CustomTooltip);

class ImprovementBarChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("resize", this.HandleRezise);
  }

  HandleRezise = e => {
    const windowsSize = window.innerWidth;
    const containerSize =
      (windowsSize <= 960 && parseInt(windowsSize * 0.9)) || "100%";

    this.setState({ windowsSize, containerSize });
  };

  render() {
    const { containerSize } = this.state;
    const { chartData } = this.props;

    const height = 325;
    const mobileHeight = 200;
    return (
      <Fragment>
        <Media query="(min-width: 490px)">
          {matches =>
            matches ? (
              <ResponsiveContainer width={containerSize} height={height}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
                >
                  <XAxis
                    hide
                    dataKey="name"
                    stroke="#fff"
                    tickMargin={10}
                    padding={{ left: 0, right: 20 }}
                  />
                  <YAxis
                    type="number"
                    domain={[-100, 100]}
                    interval={0}
                    stroke="#fff"
                    tickMargin={10}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 52, 14, 0.3)" }}
                    content={<CustomToolTip />}
                  />
                  <ReferenceLine y={0} />
                  <Bar dataKey="value" fill="#ff340e" barSize={24}>
                    <LabelList dataKey="name" content={customLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width={containerSize} height={mobileHeight}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
                >
                  <XAxis
                    hide
                    dataKey="name"
                    stroke="#fff"
                    tickMargin={10}
                    padding={{ left: 0, right: 0 }}
                  />
                  <YAxis
                    type="number"
                    domain={[-100, 100]}
                    interval={0}
                    stroke="#fff"
                    tickMargin={10}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 52, 14, 0.3)" }}
                    content={<CustomToolTip />}
                  />
                  <ReferenceLine y={0} />
                  <Bar dataKey="value" fill="#ff340e" barSize={20}>
                    <LabelList dataKey="name" content={mobileCustomLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )
          }
        </Media>
      </Fragment>
    );
  }
}

export default ImprovementBarChart;
