import React, { Component } from "react";
import { Grid } from "@material-ui/core";
// Componentes
import AverageWidget from "./AverageWidget.jsx";
import AverageGraphWidget from "./AverageGraphWidget.jsx";

// utils
import localizationJSON from "../../../utils/localization";

/**
 * Mostrar dinamicamente los graficos.
 */
class teamGraphDisplay extends Component {
  // el state interno del componente
  constructor(props) {
    super(props);

    const { teamData, lang } = props;

    // all Categories
    const categories = [];

    Object.keys(teamData.categories).forEach(category => {
      categories.push({
        name: category,
        members: teamData.categories[category].members,
        stats: teamData.categories[category].catStats,
        overall: teamData.categories[category].catStats.overall
      });
    });

    const allCategories = [
      {
        name: "Todos",
        members: teamData.allMembers.members,
        stats: teamData.allMembers.catStats,
        overall: teamData.allMembers.catStats.overall
      },
      ...categories
    ];

    // ChartData
    const chartData = [
      {
        name: localizationJSON[lang].LongJump,
        value: allCategories[0].stats.normalizedLongJump.toFixed(0)
      },
      {
        name: localizationJSON[lang].BallToss,
        value: allCategories[0].stats.normalizedBallToss.toFixed(0)
      },
      {
        name: localizationJSON[lang]["40yd"],
        value: allCategories[0].stats.normalized40yd.toFixed(0)
      },
      {
        name: localizationJSON[lang].Agility,
        value: allCategories[0].stats.normalizedAgility.toFixed(0)
      },
      {
        name: localizationJSON[lang].PlankHold,
        value: allCategories[0].stats.normalizedPlankHold.toFixed(0)
      },
      {
        name: localizationJSON[lang].BeepTest,
        value: allCategories[0].stats.normalizedBeepTest.toFixed(0)
      }
    ];

    this.state = {
      allCategories,
      currentCategory: allCategories[0].name,
      currentCategoryMember: allCategories[0].members,
      currentCategoryAverage: allCategories[0].overall,
      chartData
    };
  }

  // #region Eventos

  // controla cuando hay cambios en el select
  HandleSelectInputChanges = event => {
    const { allCategories } = this.state;
    const { lang } = this.props;

    const GetCategoryData = allCategories.filter(
      value => value.name === event.target.value
    );

    this.setState(prevState => ({
      [event.target.name]: event.target.value,
      currentCategoryMember: GetCategoryData[0].members,
      currentCategoryAverage: GetCategoryData[0].overall,
      chartData: [
        {
          name: localizationJSON[lang].LongJump,
          value: GetCategoryData[0].stats.normalizedLongJump.toFixed(0)
        },
        {
          name: localizationJSON[lang].BallToss,
          value: GetCategoryData[0].stats.normalizedBallToss.toFixed(0)
        },
        {
          name: localizationJSON[lang]["40yd"],
          value: GetCategoryData[0].stats.normalized40yd.toFixed(0)
        },
        {
          name: localizationJSON[lang].Agility,
          value: GetCategoryData[0].stats.normalizedAgility.toFixed(0)
        },
        {
          name: localizationJSON[lang].PlankHold,
          value: GetCategoryData[0].stats.normalizedPlankHold.toFixed(0)
        },
        {
          name: localizationJSON[lang].BeepTest,
          value: GetCategoryData[0].stats.normalizedBeepTest.toFixed(0)
        }
      ]
    }));
  };

  // #endregion

  render() {
    const {
      allCategories,
      currentCategory,
      currentCategoryMember,
      currentCategoryAverage,
      chartData
    } = this.state;
    const { teamData, lang } = this.props;

    const catNames = Object.keys(teamData.categories);
    const catsOverall = [];
    catNames.forEach(val => {
      catsOverall.push({
        cat: val,
        value: teamData.categories[val].catStats.overall
      });
    });

    return (
      <Grid container spacing={16} alignContent="center">
        <Grid item xs={12} md={4}>
          <AverageWidget
            HandleClickIndividualMember={this.HandleClickIndividualMember}
            HandleSelectInputChanges={this.HandleSelectInputChanges}
            allCategories={allCategories}
            catMembers={currentCategoryMember}
            cat={currentCategory}
            teamData={teamData}
            lang={lang}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <AverageGraphWidget
            data={chartData}
            lang={lang}
            currentCategoryAverage={currentCategoryAverage}
          />
        </Grid>
      </Grid>
    );
  }
}

export default teamGraphDisplay;
