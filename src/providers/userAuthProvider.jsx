import React, { Component } from "react";
import Axios from "axios";
import userAuthContext from "../context/context";

// utils
import Team from "../utils/classes/TeamClass";
import Member from "../utils/classes/MemberClass";
import GlobalConfig from "../utils/config";

class userAuthProvider extends Component {
  constructor(props) {
    super(props);

    const myPersistData = localStorage.getItem("persistedData")
      ? JSON.parse(localStorage.getItem("persistedData"))
      : {};

    const myPersistMemberData = localStorage.getItem("PersistedMemberData")
      ? JSON.parse(localStorage.getItem("PersistedMemberData"))
      : {};

    this.state = {
      accessToken: myPersistData !== {} ? myPersistData.accessToken : "",
      userData: myPersistData !== {} ? myPersistData.userData : {},
      memberData: myPersistMemberData !== {} ? myPersistMemberData : {},
      teamData: [],
      fetchTeam: false,
      fetchMember: false,
      allreviews: [],
      lang: "en"
    };
  }

  componentDidMount() {
    this.GetAllReviewsData();
  }

  // evento al hacer login
  LoginEvent = data => {
    const { accessToken, userData } = data;

    if (userData.userType === "player") {
      this.GetMemberData(userData);
    } else if (userData.userType === "teamOwner") {
      this.GetTeamData(userData.team);
    }

    // guardar la data
    this.setState(
      {
        accessToken,
        userData
      },
      () => {
        localStorage.setItem(
          "persistedData",
          JSON.stringify({
            accessToken,
            userData
          })
        );
      }
    );
  };

  GetAllReviewsData = () => {
    Axios({
      method: "get",
      url: `${GlobalConfig.API_URL}/api/Reviews`
    }).then(response => {
      this.setState({
        allreviews: response.data
      });
    });
  };

  // get team JSON
  GetTeamData = teamName => {
    const team = new Team();
    const teamURL = `${GlobalConfig.API_URL}/team`;

    this.setState({
      fetchTeam: true
    });
    Axios({
      method: "GET",
      url: teamURL,
      params: {
        team: teamName
      }
    })
      .then(response => {
        team.Init(response.data);
        this.setState({
          teamData: team,
          fetchTeam: false
        });
      })
      .catch(err => console.log(err));
  };

  // get memberDATA
  GetMemberData = userData => {
    const member = new Member();
    const memberURL = `${GlobalConfig.API_URL}/member`;
    let getMember = {};
    // cambiamos el state
    this.setState({
      fetchMember: true
    });

    Axios({
      method: "GET",
      url: memberURL,
      params: {
        name: userData.name,
        lastName: userData.lastName,
        team: userData.team
      }
    })
      .then(response => {
        getMember = response.data;

        member.Init(getMember[0]);

        getMember.forEach(element => {
          member.AddTest(element);
        });

        this.setState({
          memberData: member,
          fetchMember: false
        });
      })
      .catch(err => console.log(err));
  };

  UpdateData = (member, team) => {
    this.setState({
      memberData: Object.keys(member) === 0 ? {} : member,
      teamData: team.length > 0 ? [] : team
    });
  };

  // actualiza los datos del jugador
  UpdateMemberData = member => {
    const { userData } = this.state;

    if (userData.userType === "teamOwner") {
      // guardar los datos en el localStorage
      localStorage.setItem("PersistedMemberData", JSON.stringify(member));
      // actualizar el state
      this.setState(state => ({ memberData: member }));
    }
  };

  // actualiza los datos del equipo
  UpdateTeamData = team => {
    this.setState({
      teamData: team
    });
  };

  // verifica si el usuario esta autenticado
  AuthUser = (token, userID) => {
    // verificar si existe token
    if (token !== "" && token !== undefined) {
      const URL = `${
        GlobalConfig.API_URL
      }/api/usersModel/${userID}?access_token=${token}`;

      return Axios({
        method: "GET",
        url: URL
      })
        .then(response => {
          if (response.status === 401) {
            return false;
          }
          return true;
        })
        .catch(err => {
          if (err) console.log(err);
        });
    }
    return false;
  };

  render() {
    const { children } = this.props;

    return (
      <userAuthContext.Provider
        value={{
          state: this.state,
          // funciones aqui
          loginEvent: this.LoginEvent,
          isAuthenticated: this.AuthUser,
          updateMemberData: this.UpdateMemberData,
          updateTeamData: this.UpdateTeamData,
          updateData: this.UpdateData,
          getMemberData: this.GetMemberData,
          getTeamData: this.GetTeamData,
          getAllReviewsData: this.GetAllReviewsData
        }}
      >
        {children}
      </userAuthContext.Provider>
    );
  }
}

export default userAuthProvider;
