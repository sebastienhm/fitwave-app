import BasePerformanceRange from "../mock_data/MaxResultsNew.json";
import localizationJSON from "./localization";

// get de BASE Performance Range
const GetBasePerformanceRange = (age, sex) => {
  const baseRange = BasePerformanceRange.filter(element => {
    if (element.Age == age && element.Sex === sex) {
      return true;
    }
    return false;
  });

  return baseRange[0];
};

// obtiene el porcentaje
const GetPorcentaje = ratio => {
  const base = 0.4;
  const buff = 0.6;
  const result = (base + buff * ratio) * 100;
  return Math.min(Math.max(result, 0), 99).toFixed(2);
};
/**
 * Funcion para normalizar la data 0-1
 *
 * @param {*} result resultado
 * @param {*} minBase Rango base minimo
 * @param {*} maxBase Rango base maximo
 * @param {*} maxBetter maximo es mejor?
 * @returns
 */
const NormalizeData = (result, minBase, maxBase, maxBetter) => {
  const resultadoMin = 1 - (result - maxBase) / (minBase - maxBase);
  const resultadoMax = (result - minBase) / (maxBase - minBase);

  if (maxBetter) {
    return GetPorcentaje(resultadoMax);
  }
  return GetPorcentaje(resultadoMin);
};

// crea un objeto con los parametros obtenidos
const CreateArrayData = (id, name, val, result, date) => ({
  id,
  name,
  val,
  result,
  date
});

// Cambiar de Shuttles to Level/Stages
const FormatBeepTest = shuttles => {
  let formattedBeepTest;
  const shuttlesPerLevel = {
    1: 7,
    2: 15,
    3: 23,
    4: 32,
    5: 41,
    6: 51,
    7: 61,
    8: 72,
    9: 83,
    10: 94,
    11: 106,
    12: 118,
    13: 131,
    14: 144,
    15: 157,
    16: 171,
    17: 185,
    18: 200,
    19: 215,
    20: 231,
    21: 247
  };

  // calcular el beepTest
  for (const level in shuttlesPerLevel) {
    if (shuttles > shuttlesPerLevel[level]) {
      continue;
    } else if (shuttles === shuttlesPerLevel[level]) {
      formattedBeepTest = { level, remmant: 1 };
      break;
    } else {
      formattedBeepTest = {
        level: level - 1,
        remmant: shuttles - shuttlesPerLevel[level - 1]
      };
      break;
    }
  }

  // retornar
  return `Lvl ${formattedBeepTest.level}.${formattedBeepTest.remmant}`;
};

const FormatSecToMin = sec => {
  let formated;
  if (sec > 60) {
    formated = `${(sec / 60).toFixed(0)}:${sec % 60} min`;
  } else {
    formated = `${sec} sec`;
  }
  return formated;
};

// formatear los resultados
const FormatTestResult = (result, key) => {
  let formatted;
  switch (key) {
    case localizationJSON.en["40yd"] || localizationJSON.es["40yd"]:
      formatted = `${result} s`;
      break;
    case localizationJSON.en.Agility || localizationJSON.es.Agility:
      formatted = `${result} s`;
      break;
    case localizationJSON.en.LongJump || localizationJSON.es.LongJump:
      formatted = `${result} m`;
      break;
    case localizationJSON.en.BallToss || localizationJSON.es.BallToss:
      formatted = `${result} m`;
      break;
    case localizationJSON.en.PlankHold || localizationJSON.es.PlankHold:
      formatted = `${FormatSecToMin(result)}`;
      break;
    case localizationJSON.en.BeepTest || localizationJSON.es.BeepTest:
      formatted = `${FormatBeepTest(result)}`;
      break;
    default:
      formatted = "NaN";
      break;
  }

  return formatted;
};

export default {
  GetBasePerformanceRange,
  GetPorcentaje,
  NormalizeData,
  CreateArrayData,
  FormatTestResult,
  FormatBeepTest
};
