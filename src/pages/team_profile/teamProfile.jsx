import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";

// context
import teamContext from "../../context/context";

// Componentes
import TeamHeader from "./components/teamHeader.jsx";
import GroupStatsWidget from "./components/GroupStatsWidget.jsx";
import TeamGraphDisplay from "./components/teamGraphDisplay.jsx";
import ReviewWidget from "./components/ReviewWidget.jsx";

/**
 * El estilo de este componente
 */
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class teamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  HandleOpenModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  HandleCloseModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  render() {
    const { modalOpen } = this.state;
    const {
      classes,
      match: {
        params: { teamid }
      }
    } = this.props;

    return (
      <div className={classes.root}>
        <teamContext.Consumer>
          {context => {
            const {
              lang,
              userData,
              allreviews,
              teamData,
              teamData: {
                allMembers: { members }
              }
            } = context.state;
            const { getAllReviewsData } = context;

            const teamOwnerReviews = allreviews
              .filter(review => {
                if (review.userTeamID == userData.userID) {
                  return true;
                }
                return false;
              })
              .sort(
                (a, b) => new Date(a.createdDate) < new Date(b.createdDate)
              );

            return (
              <Fragment>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <TeamHeader
                      lang={lang}
                      teamName={teamid}
                      totalMembers={members.length}
                      modalOpen={modalOpen}
                      teamData={teamData}
                      openModalEvent={this.HandleOpenModal}
                      closeModalEvent={this.HandleCloseModal}
                      updateReviews={getAllReviewsData}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <br />
                    <GroupStatsWidget teamData={teamData} lang={lang} />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderRadius: 4,
                        padding: 8
                      }}
                    >
                      <br />
                      <Typography
                        variant="title"
                        style={{
                          color: "#7c7c7c"
                        }}
                      >
                        CATEGORIES
                      </Typography>
                      <br />
                      <Divider
                        style={{
                          backgroundColor: "#7c7c7c"
                        }}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <TeamGraphDisplay teamData={teamData} lang={lang} />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderRadius: 4,
                        padding: 8
                      }}
                    >
                      <br />
                      <Typography
                        variant="title"
                        style={{
                          color: "#7c7c7c"
                        }}
                      >
                        REVIEWS
                      </Typography>
                      <br />
                      <Divider
                        style={{
                          backgroundColor: "#7c7c7c"
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <ReviewWidget
                      lang={lang}
                      teamid={teamid}
                      teamOwnerReviews={teamOwnerReviews}
                    />
                  </Grid>
                </Grid>
              </Fragment>
            );
          }}
        </teamContext.Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(teamProfile);
