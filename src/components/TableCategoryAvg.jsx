import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  Avatar
} from "@material-ui/core";

import cloudinary from "cloudinary-core";

// context
import AuthContext from "../context/context";

// utils
import localizationJSON from "../utils/localization";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "hdkwrkhs8",
  secure: true
});
/**
 * El estilo de este componente
 */
const styles = theme => ({
  root: {},
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  playerDisplay: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    border: `3px solid ${theme.palette.primary.dark}`,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

/**
 * Sobre escribe el estilo de TableCell
 */
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    position: "sticky",
    textAlign: "center",
    top: 0,
    zIndex: 10,
    padding: "10px 24px",
    display: "table-cell"
  },
  body: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    textAlign: "center",
    fontSize: 14,
    border: `1px solid rgba(255, 255, 255, 0.12)`,
    padding: "10px 24px",
    display: "table-cell"
  }
}))(TableCell);

const CustomFirstTableCell = withStyles(theme => ({
  root: {
    minWidth: 250,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
    padding: "10px 24px",
    display: "table-cell"
  }
}))(TableCell);

const TableCategoryAvg = props => {
  const { classes, categoryMembers, match, lang } = props;

  const sortCategoryMemberByOverall = categoryMembers.sort(
    (a, b) => b.overall - a.overall
  );

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <CustomFirstTableCell>
              <Typography>{localizationJSON[lang].player}</Typography>
            </CustomFirstTableCell>
            <CustomTableCell>
              <Typography>{localizationJSON[lang].overall}</Typography>
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortCategoryMemberByOverall.map((innerValue, index) => {
            const fullName =
              innerValue.name.replace(/\s/g, "") +
              innerValue.lastName.replace(/\s/g, "");

            const key = `${fullName} ${index}`;

            return (
              <TableRow className={classes.row} key={key}>
                <CustomTableCell component="th" scope="row">
                  <AuthContext.Consumer>
                    {context => {
                      const { updateMemberData } = context;

                      return (
                        <div className={classes.playerDisplay}>
                          <Link
                            to={{
                              pathname: `${match.url}/individual/${
                                innerValue.name
                              }`
                            }}
                            onClick={() => updateMemberData(innerValue)}
                          >
                            <Avatar
                              className={classes.avatar}
                              src={cloudinaryCore.url(
                                `teams/${
                                  match.params.teamid
                                }/miembros/${fullName}.png`,
                                {
                                  qquality: "auto",
                                  flags: "lossy"
                                }
                              )}
                              onError={e => {
                                e.target.src = "/images/fitware/silueta.png";
                              }}
                            />
                          </Link>
                          <Typography style={{ paddingLeft: 10 }}>
                            {`${innerValue.name} ${innerValue.lastName}`}
                          </Typography>
                        </div>
                      );
                    }}
                  </AuthContext.Consumer>
                </CustomTableCell>
                <CustomTableCell>
                  {
                    innerValue.testResults[innerValue.testResults.length - 1]
                      .overall
                  }
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  withRouter
)(TableCategoryAvg);
