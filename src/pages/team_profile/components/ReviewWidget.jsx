import React from "react";
import { Grid } from "@material-ui/core";

// component
import ReviewCard from "../../../components/reviewCard.jsx";

const ReviewWidget = props => {
  const { teamOwnerReviews, teamid, lang } = props;
  return (
    <Grid container spacing={16}>
      {teamOwnerReviews.map(review => {
        const {
          discipline,
          effort,
          puntuality,
          teamwork,
          name,
          lastName
        } = review;
        return (
          <Grid item xs={12} md={3}>
            <ReviewCard
              lang={lang}
              teamName={teamid}
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
  );
};

export default ReviewWidget;
