import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";

// Helper
import GlobalFunctions from "../../../utils/functionHelper.jsx";
import localizationJSON from "../../../utils/localization";

// componentes
import PerformanceWidget from "./PerformanceWidget.jsx";
import ImprovementWidget from "./ImprovementWidget.jsx";
import StatsCard from "../../../components/StatCard.jsx";
import FormulaWidget from "../../../components/FormulaCards.jsx";

class ProfileGraphDisplay extends Component {
  // inicalizar el state
  constructor(props) {
    super(props);

    // actualizar el state
    const { user, lang } = this.props;

    // los rangos de maximo y minimo
    const baseRange = GlobalFunctions.GetBasePerformanceRange(
      user.age,
      user.sex
    );

    this.state = {
      test: user.testResults.length,
      chartData: [
        {
          name: localizationJSON[lang].LongJump,
          value:
            user.testResults[user.testResults.length - 1].normalizedLongJump,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1].longJump,
            localizationJSON[lang].LongJump
          )
        },
        {
          name: localizationJSON[lang].BallToss,
          value:
            user.testResults[user.testResults.length - 1].normalizedBallToss,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1].ballToss,
            localizationJSON[lang].BallToss
          )
        },
        {
          name: localizationJSON[lang]["40yd"],
          value: user.testResults[user.testResults.length - 1].normalized40yd,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1]["40yd"],
            localizationJSON[lang]["40yd"]
          )
        },
        {
          name: localizationJSON[lang].Agility,
          value:
            user.testResults[user.testResults.length - 1].normalizedAgility,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1].agility,
            localizationJSON[lang].Agility
          )
        },
        {
          name: localizationJSON[lang].PlankHold,
          value:
            user.testResults[user.testResults.length - 1].normalizedPlankHold,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1].plankHold,
            localizationJSON[lang].PlankHold
          )
        },
        {
          name: localizationJSON[lang].BeepTest,
          value:
            user.testResults[user.testResults.length - 1].normalizedBeepTest,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[user.testResults.length - 1].beepTest,
            localizationJSON[lang].BeepTest
          )
        }
      ]
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (
      user.name != prevProps.user.name &&
      user.lastName != prevProps.user.lastName
    ) {
      this.HandleUpdateChartData(user.testResults.length - 1);
    }
  }

  // Maneja el evento al hacer click para actualizar la graficas
  HandleUpdateChartData = item => {
    const { user, lang } = this.props;
    // se crea una nueva data

    const baseRange = GlobalFunctions.GetBasePerformanceRange(
      user.age,
      user.sex
    );

    // se actualiza el state
    this.setState(prevState => ({
      baseRange,
      chartData: [
        {
          name: localizationJSON[lang].LongJump,
          value: user.testResults[item].normalizedLongJump,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item].longJump,
            localizationJSON[lang].LongJump
          )
        },
        {
          name: localizationJSON[lang].BallToss,
          value: user.testResults[item].normalizedBallToss,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item].ballToss,
            localizationJSON[lang].BallToss
          )
        },
        {
          name: localizationJSON[lang]["40yd"],
          value: user.testResults[item].normalized40yd,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item]["40yd"],
            localizationJSON[lang]["40yd"]
          )
        },
        {
          name: localizationJSON[lang].Agility,
          value: user.testResults[item].normalizedAgility,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item].agility,
            localizationJSON[lang].Agility
          )
        },
        {
          name: localizationJSON[lang].PlankHold,
          value: user.testResults[item].normalizedPlankHold,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item].plankHold,
            localizationJSON[lang].PlankHold
          )
        },
        {
          name: localizationJSON[lang].BeepTest,
          value: user.testResults[item].normalizedBeepTest,
          result: GlobalFunctions.FormatTestResult(
            user.testResults[item].beepTest,
            localizationJSON[lang].BeepTest
          )
        }
        // {
        //   date: localizationJSON[lang].Date,
        //   value: user.testResults[item],
        //   result: GlobalFunctions.FormatTestResult(
        //     user.testResults[item].date,
        //     localizationJSON[lang].Date
        //   )
        // }
      ]
    }));
  };

  GetCurrentStats = item => {
    const { lang } = this.props;
    console.log(item.date);

    // se crea una variable para almacenar todo
    const finalData = [];

    // se crea todos los labels disponibles
    const labels = [
      localizationJSON[lang].BallToss,
      localizationJSON[lang].Agility,
      localizationJSON[lang].PlankHold,
      localizationJSON[lang]["40yd"],
      localizationJSON[lang].LongJump,
      localizationJSON[lang].BeepTest
    ];

    // se obtiene el porcentaje
    const porcentajeData = [
      item.normalizedBallToss,
      item.normalizedAgility,
      item.normalizedPlankHold,
      item.normalized40yd,
      item.normalizedLongJump,
      item.normalizedBeepTest
    ];

    const resultados = [
      item.ballToss,
      item.agility,
      item.plankHold,
      item["40yd"],
      item.longJump,
      item.beepTest
    ];

    // se hace un for para agregar a la data final
    labels.forEach((title, index) => {
      finalData.push(
        GlobalFunctions.CreateArrayData(
          index,
          title,
          porcentajeData[index],
          GlobalFunctions.FormatTestResult(resultados[index], title),
          item.date
        )
      );
    });

    return finalData;
  };

  // controla cuando hay cambios en el select
  HandleSelectInputChanges = event => {
    this.HandleUpdateChartData(event.target.value - 1);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { chartData, test } = this.state;
    const { user, teamName, lang } = this.props;

    // console.log(chartData);
    // console.log(test);
    // console.log(this.props.user);

    // current stats
    const currentStats = this.GetCurrentStats(
      user.testResults[user.testResults.length - 1],
      user.testResults.length - 1
    );

    const showAdvanceCard = () => {
      if (user.BhasImprovements()) {
        const improvement = user.GetImprovements();

        const mychartData = [
          {
            name: localizationJSON[lang].LongJump,
            value: improvement.improvementLongJump
          },
          {
            name: localizationJSON[lang].BallToss,
            value: improvement.improvementBallToss
          },
          {
            name: localizationJSON[lang]["40yd"],
            value: improvement.improvement40yd
          },
          {
            name: localizationJSON[lang].Agility,
            value: improvement.improvementAgility
          },
          {
            name: localizationJSON[lang].PlankHold,
            value: improvement.improvementPlankHold
          },
          {
            name: localizationJSON[lang].BeepTest,
            value: improvement.improvementBeepTest
          }
        ];

        return (
          <Fragment>
            <Grid item xs={12}>
              <PerformanceWidget
                HandleSelectInputChanges={this.HandleSelectInputChanges}
                chartData={chartData}
                user={user}
                test={test}
                HandleButtonChangeChartData={this.HandleUpdateChartData}
                lang={lang}
                fullwidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatsCard
                user={user}
                teamName={teamName}
                stats={currentStats}
                lang={lang}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ImprovementWidget chartData={mychartData} lang={lang} />
            </Grid>
          </Fragment>
        );
      }

      return (
        <Fragment>
          <Grid item xs={12} md={6}>
            <StatsCard
              user={user}
              teamName={teamName}
              stats={currentStats}
              lang={lang}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PerformanceWidget
              HandleSelectInputChanges={this.HandleSelectInputChanges}
              HandleButtonChangeChartData={this.HandleUpdateChartData}
              chartData={chartData}
              user={user}
              test={test}
              lang={lang}
              fullwidth={false}
            />
          </Grid>
        </Fragment>
      );
    };

    return (
      // last 6 widgets
      <Grid container spacing={16}>
        {showAdvanceCard()}
        <Grid item xs={12}>
          {/* user is all the data related to the user */}
          <FormulaWidget
            GetCurrentStats={this.GetCurrentStats}
            user={user}
            currentStats={currentStats}
            lang={lang}
            baseRange={this.state.baseRange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default ProfileGraphDisplay;
