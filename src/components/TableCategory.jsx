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
  Avatar,
  Typography
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
  table: {
    minWidth: 700
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
    width: 125,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    position: "sticky",
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

const TableCategory = props => {
  const { classes, categoryMembers, match, lang } = props;

  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHead}>
        <TableRow>
          <CustomFirstTableCell>
            <Typography>{localizationJSON[lang].player}</Typography>
          </CustomFirstTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].position}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].Agility}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].BallToss}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].LongJump}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].PlankHold}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang]["40yd"]}</Typography>
          </CustomTableCell>
          <CustomTableCell>
            <Typography>{localizationJSON[lang].BeepTest}</Typography>
          </CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categoryMembers.map((innerValue, index) => {
          const fullName =
            innerValue.name.replace(/\s/g, "") +
            innerValue.lastName.replace(/\s/g, "");

          const key = `${fullName}${index}`;
          return (
            <TableRow className={classes.row} key={key}>
              <CustomTableCell component="th" scope="row">
                <AuthContext.Consumer>
                  {context => {
                    const { updateMemberData } = context;

                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start"
                        }}
                      >
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
                                quality: "auto",
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
                {innerValue.pos ? innerValue.pos : "VOL"}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalizedAgility}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalizedBallToss}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalizedLongJump}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalizedPlankHold}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalized40yd}
              </CustomTableCell>
              <CustomTableCell>
                {innerValue.testResults[0].normalizedBeepTest}
              </CustomTableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default compose(
  withStyles(styles),
  withRouter
)(TableCategory);
