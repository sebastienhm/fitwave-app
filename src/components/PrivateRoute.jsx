import React from "react";
import { Route, Redirect } from "react-router-dom";
import Axios from "axios";

// components
import Preloading from "./Preloading.jsx";

// context
import AuthContext from "../context/context";

// helpers
import Member from "../utils/classes/MemberClass";
import Team from "../utils/classes/TeamClass";
import Config from "../utils/config";

// componente para privatizar rutas
const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {context => {
      const {
        teamData,
        memberData,
        userData,
        accessToken,
        fetchTeam,
        fetchMember,
        allreviews,
        lang
      } = context.state;
      const { isAuthenticated, updateData } = context;

      // Data de respaldo
      let fetch;

      const GetMemberData = user => {
        fetch = true;
        Axios({
          method: "GET",
          url: `${Config.API_URL}/member`,
          params: {
            name: user.name,
            lastName: user.lastName,
            team: user.team
          }
        })
          .then(response => {
            const getMember = response.data;
            const member = new Member();
            member.Init(getMember[0]);
            for (let i = 1; i < getMember.length; i++) {
              member.AddTest(getMember[i]);
            }
            updateData(member, []);
            fetch = false;
          })
          .catch(err => console.log(err));
      };

      const GetTeamData = teamName => {
        fetch = true;
        Axios({
          method: "GET",
          url: `${Config.API_URL}/team`,
          params: {
            team: teamName
          }
        })
          .then(response => {
            const team = new Team();
            team.Init(response.data);
            updateData({}, team);
            fetch = false;
          })
          .catch(err => console.log(err));
      };

      // si es jugador y memberData en el context esta vacio
      if (
        userData.userType == "player" &&
        Object.keys(memberData).length === 0
      ) {
        GetMemberData(userData);
      }
      // si es TeamOwner y teamData en el context esta vacio
      else if (userData.userType == "teamOwner" && teamData.length >= 0) {
        // hacer Fetch al team data
        GetTeamData(userData.team);
      }

      if (fetchTeam || fetchMember || fetch) {
        return <Preloading />;
      }

      return (
        <Route
          {...rest}
          render={props => {
            if (isAuthenticated(accessToken, userData.userID)) {
              if (userData.userType == "player") {
                return (
                  <Component
                    {...props}
                    memberData={memberData}
                    teamName={userData.team}
                    playerID={userData.userID}
                    allreviews={allreviews}
                    lang={lang}
                  />
                );
              }
              return (
                <Component
                  {...props}
                  userData={userData}
                  memberData={memberData}
                  allreviews={allreviews}
                  lang={lang}
                />
              );
            }
            return <Redirect to={{ pathname: "/" }} />;
          }}
        />
      );
    }}
  </AuthContext.Consumer>
);

export default PrivateRoute;
