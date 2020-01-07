import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

// Componentes
import ReviewCard from "../../components/reviewCard.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import ProfileGraphDisplay from "./components/ProfileGraphDisplay.jsx";

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

class IndividualProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, memberData, userData, allreviews, lang } = this.props;

    // redirect if MEMBER DATA IS EMPTY
    if (Object.keys(memberData).length < 1) {
      return <Redirect to={`/team/${userData.team}`} />;
    }

    // get reviews by Player and sort by DATE
    const memberReviews = allreviews
      .filter(review => {
        if (
          review.name == memberData.name &&
          review.lastName == memberData.lastName
        )
          return true;
        return false;
      })
      .sort((a, b) => new Date(a.createdDate) < new Date(b.createdDate));

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ProfileHeader
              user={memberData}
              teamName={userData.team}
              lang={lang}
            />
          </Grid>

          <Grid item xs={12}>
            <ProfileGraphDisplay
              user={memberData}
              teamName={userData.team}
              lang={lang}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={16}>
              {memberReviews.map(review => {
                const {
                  discipline,
                  effort,
                  puntuality,
                  teamwork,
                  name,
                  lastName
                } = review;
                return (
                  <Grid item xs={3}>
                    <ReviewCard
                      teamName={userData.team}
                      discipline={discipline}
                      effort={effort}
                      puntuality={puntuality}
                      teamwork={teamwork}
                      name={name}
                      lastName={lastName}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(IndividualProfile);
