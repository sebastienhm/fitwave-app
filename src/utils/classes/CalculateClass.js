import performanceBaseRange from "../../mock_data/MaxResultsNew.json";

class Calculate {
  // Obtener Porcentaje
  GetPercentage = ratio => {
    const base = 0.4;
    const buff = 0.6;
    const result = (base + buff * ratio) * 100;
    return Math.min(Math.max(result, 0), 99).toFixed(0);
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
  NormalizeResult = (result, minBase, maxBase, bMaxIsBetter) => {
    const resultadoMin = 1 - (result - maxBase) / (minBase - maxBase);
    const resultadoMax = (result - minBase) / (maxBase - minBase);

    if (result != 0) {
      // si alto es mejor
      if (bMaxIsBetter) {
        return this.GetPercentage(resultadoMax);
      }
      return this.GetPercentage(resultadoMin);
    }
    return 0;
  };

  // Obtener Rango Base
  GetBaseRangePerformance = (age, sex) => {
    const baseRange = performanceBaseRange.filter(element => {
      if (element.Age == age && element.Sex == sex) {
        return true;
      }
      return false;
    });

    return baseRange[0];
  };

  // obtiene el promedio
  GetAverage = stats => {
    const sum = stats.reduce((total, value) => total + value);
    return (sum / stats.length).toFixed(0);
  };
}

export default Calculate;
