import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Dialog,
  DialogContent
} from "@material-ui/core";
import StarRatings from "react-star-ratings";
import cloudinary from "cloudinary-core";
import Axios from "axios";
import qs from "query-string";
import Globals from "../utils/config";
import localizationJSON from "../utils/localization";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "hdkwrkhs8",
  secure: true
});

const avatarSize = 150;
// Styles
const styles = theme => ({
  paperTitleModal: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: theme.spacing.unit * 50,
    height: 60,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5]
  },
  paperSubmitModal: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5]
  },
  dialog: {
    backgroundColor: theme.palette.secondary.dark
  },
  selectedPlayer: {
    margin: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  avatar: {
    margin: theme.spacing.unit,
    height: avatarSize,
    width: avatarSize,
    border: `3px solid ${theme.palette.primary.dark}`,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)"
  },
  reviews: {
    margin: theme.spacing.unit,
    display: "flex",
    flexDirection: "column"
  },
  reviewsChild: {
    alignSelf: "center"
  }
});

class ModalReview extends Component {
  state = {
    discipline: 0,
    effort: 0,
    puntuality: 0,
    teamwork: 0,
    category: "",
    player: ""
  };

  HandleChangeSelect = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeRating = (newRating, name) => {
    this.setState({
      [name]: newRating
    });
  };

  HandleSubmitReview = event => {
    const { discipline, effort, puntuality, teamwork, player } = this.state;
    const { HandleCloseModal, updateReviews } = this.props;
    const userDataJSON = JSON.parse(localStorage.getItem("persistedData"));
    const {
      userData: { userID },
      accessToken
    } = userDataJSON;

    const Required =
      discipline > 0 && effort > 0 && puntuality > 0 && teamwork > 0;

    if (Required && Object.keys(player).length != 0) {
      // first find the player id
      Axios({
        method: "get",
        url: `${Globals.API_URL}/api/usersModel/findOne?filter[where][name]=${
          player.name
        }&filter[where][lastName]=${
          player.lastName
        }&access_token=${accessToken}`
      })
        .then(response => {
          const teamOwnerID = userID;
          const playerID = response.data;
          return Axios({
            method: "post",
            url: `${Globals.API_URL}/api/Reviews?&access_token=${accessToken}`,
            data: qs.stringify({
              name: playerID.name,
              lastName: playerID.lastName,
              createdDate: new Date(),
              discipline,
              effort,
              puntuality,
              teamwork,
              userTeamID: teamOwnerID,
              userPlayerID: playerID.userID
            })
          });
        })
        .then(response => {
          // review creado
          // close modal
          updateReviews();
          HandleCloseModal();
          // reset all states
          this.setState({
            discipline: 0,
            effort: 0,
            puntuality: 0,
            teamwork: 0,
            category: "",
            player: ""
          });
        });
    }
  };

  render() {
    const {
      category,
      player,
      discipline,
      effort,
      teamwork,
      puntuality
    } = this.state;
    const {
      classes,
      fullScreen,
      modalOpen,
      HandleCloseModal,
      teamData,
      teamName,
      lang
    } = this.props;
    return (
      <Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={modalOpen}
          onClose={HandleCloseModal}
          scroll="paper"
        >
          <div className={classes.paperTitleModal}>
            <Typography variant="title" id="modal-title">
              Review
            </Typography>
          </div>
          <DialogContent className={classes.dialog}>
            <div className={classes.selectedPlayer}>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={this.HandleChangeSelect}
                    inputProps={{
                      name: "category",
                      id: "category-id"
                    }}
                  >
                    {Object.keys(teamData.categories).map(cat => (
                      <MenuItem value={cat} key={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel>Player</InputLabel>
                  <Select
                    value={player}
                    onChange={this.HandleChangeSelect}
                    inputProps={{
                      name: "player",
                      id: "player-id"
                    }}
                  >
                    {category &&
                      teamData.categories[category].members.map(member => (
                        <MenuItem value={member} key={member}>
                          {member.name} {member.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                {player && (
                  <Fragment>
                    <Avatar
                      className={classes.avatar}
                      src={cloudinaryCore.url(
                        `/teams/${teamName}/miembros/${player.name.replace(
                          /\s/g,
                          ""
                        )}${player.lastName.replace(/\s/g, "")}.png`
                      )}
                      onError={e => {
                        e.target.src = "/images/fitware/silueta.png";
                      }}
                    />
                    <Typography
                      variant="subheading"
                      id="simple-modal-description"
                      align="center"
                    >
                      {player.name} {player.lastName}
                    </Typography>
                  </Fragment>
                )}
              </div>
              <Typography variant="caption" color="primary">
                {Object.keys(player).length != 0
                  ? ""
                  : "Please Select the Player"}
              </Typography>
            </div>
            <div className={classes.reviewsContent}>
              <div className={classes.reviews}>
                <Typography variant="title" align="center">
                  {localizationJSON[lang].discipline.toUpperCase()}
                </Typography>
                <div className={classes.reviewsChild}>
                  <StarRatings
                    rating={discipline}
                    starRatedColor="red"
                    starHoverColor="blue"
                    starDimension="25px"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="discipline"
                  />
                  <Typography variant="caption" align="center" color="primary">
                    {discipline > 0 ? "" : "This field is Required"}
                  </Typography>
                </div>
              </div>
              <div className={classes.reviews}>
                <Typography variant="title" align="center">
                  {localizationJSON[lang].effort.toUpperCase()}
                </Typography>
                <div className={classes.reviewsChild}>
                  <StarRatings
                    rating={effort}
                    starRatedColor="red"
                    starHoverColor="blue"
                    starDimension="25px"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="effort"
                  />
                  <Typography variant="caption" align="center" color="primary">
                    {effort > 0 ? "" : "This field is Required"}
                  </Typography>
                </div>
              </div>
              <div className={classes.reviews}>
                <Typography variant="title" align="center">
                  {localizationJSON[lang].puntuality.toUpperCase()}
                </Typography>
                <div className={classes.reviewsChild}>
                  <StarRatings
                    rating={puntuality}
                    starRatedColor="red"
                    starHoverColor="blue"
                    starDimension="25px"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="puntuality"
                  />
                  <Typography variant="caption" align="center" color="primary">
                    {puntuality > 0 ? "" : "This field is Required"}
                  </Typography>
                </div>
              </div>
              <div className={classes.reviews}>
                <Typography variant="title" align="center">
                  {localizationJSON[lang].teamwork.toUpperCase()}
                </Typography>
                <div className={classes.reviewsChild}>
                  <StarRatings
                    rating={teamwork}
                    starRatedColor="red"
                    starHoverColor="blue"
                    starDimension="25px"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="teamwork"
                  />
                  <Typography variant="caption" align="center" color="primary">
                    {teamwork > 0 ? "" : "This field is Required"}
                  </Typography>
                </div>
              </div>
            </div>
          </DialogContent>
          <div className={classes.paperSubmitModal}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.HandleSubmitReview}
            >
              Submit
            </Button>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(ModalReview);
