import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

// Components
import Layout from "./Layout.jsx";

// Pages
import TeamProfile from "../pages/team_profile/teamProfile.jsx";
import IndividualProfile from "../pages/individual_profile/IndividualProfile.jsx";

const MainApp = props => {
  const { match, userData, memberData, allreviews, lang } = props;

  return (
    <main>
      <Layout>
        <Switch>
          <Route exact path="/team/:teamid" component={TeamProfile} />
          <Route
            path={`${match.url}/individual/:id`}
            render={prop => (
              <IndividualProfile
                lang={lang}
                userData={userData}
                memberData={memberData}
                allreviews={allreviews}
              />
            )}
          />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Layout>
    </main>
  );
};

MainApp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

export default MainApp;
