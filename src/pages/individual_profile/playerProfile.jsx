import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// Componentes
import ReviewCard from "../../components/reviewCard.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import ProfileGraphDisplay from "./components/ProfileGraphDisplay.jsx";
import Layout from "../../components/Layout.jsx";

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

/**
 * This class renders the individual profile page for any given athlete
 */
const PlayerProfile = props => {
  const { classes, memberData, teamName, playerID, allreviews, lang } = props;

  const memberReviews = allreviews.filter(review => {
    if (review.userPlayerID == playerID) return true;
    return false;
  });

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ProfileHeader user={memberData} teamName={teamName} lang={lang} />
          </Grid>

          <Grid item xs={12}>
            <ProfileGraphDisplay
              user={memberData}
              teamName={teamName}
              lang={lang}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={16} justify="space-between">
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
                  <Grid item>
                    <ReviewCard
                      teamName={teamName}
                      discipline={discipline}
                      effort={effort}
                      puntuality={puntuality}
                      teamwork={teamwork}
                      name={name}
                      lastName={lastName}
                      lang={lang}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default withStyles(styles)(PlayerProfile);
