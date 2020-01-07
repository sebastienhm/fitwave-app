import Calculate from "./CalculateClass";

class TestResult {
  date = "";

  agility = 0;

  beepTest = 0;

  "40yd" = 0;

  plankHold = 0;

  longJump = 0;

  ballToss = 0;

  normalizedAgility = 0;

  normalizedBeepTest = 0;

  normalized40yd = 0;

  normalizedPlankHold = 0;

  normalizedLongJump = 0;

  normalizedBallToss = 0;

  overall = "";

  Init = memberData => {
    const calculate = new Calculate();
    const baseRange = calculate.GetBaseRangePerformance(
      memberData.Age,
      memberData.Sex
    );
    // date
    this.date = memberData.Date;
    // Resultados
    this.agility = memberData.Agility;
    this.ballToss = memberData.BallToss;
    this["40yd"] = memberData["40yd"];
    this.longJump = memberData.LongJump;
    this.plankHold = memberData.PlankHold;
    this.beepTest = memberData.BeepTest;

    // Resultados normalizados
    this.normalizedAgility = +calculate.NormalizeResult(
      memberData.Agility,
      baseRange.AgilityMin,
      baseRange.AgilityMax,
      false
    );
    this.normalizedBallToss = +calculate.NormalizeResult(
      memberData.BallToss,
      baseRange.BallTossMin,
      baseRange.BallTossMax,
      true
    );
    this.normalizedLongJump = +calculate.NormalizeResult(
      memberData.LongJump,
      baseRange.LongJumpMin,
      baseRange.LongJumpMax,
      true
    );
    this.normalizedPlankHold = +calculate.NormalizeResult(
      memberData.PlankHold,
      baseRange.PlankHoldMin,
      baseRange.PlankHoldMax,
      true
    );
    this.normalized40yd = +calculate.NormalizeResult(
      memberData["40yd"],
      baseRange["40ydMin"],
      baseRange["40ydMax"],
      false
    );
    this.normalizedBeepTest = +calculate.NormalizeResult(
      memberData.BeepTest,
      baseRange.BeepTestMin,
      baseRange.BeepTestMax,
      true
    );

    this.GetOverall();
  };

  GetOverall = () => {
    if (this.overall != 0) {
      return this.overall;
    }
    const normalizedData = [
      this.normalized40yd,
      this.normalizedAgility,
      this.normalizedBallToss,
      this.normalizedBeepTest,
      this.normalizedPlankHold,
      this.normalizedLongJump
    ];
    const sum = normalizedData.reduce((total, value) => total + value);
    this.overall = (sum / normalizedData.length).toFixed(0);
    return this.overall;
  };

  Aggregate = testResult => {
    this.normalized40yd += testResult.normalized40yd;
    this.normalizedAgility += testResult.normalizedAgility;
    this.normalizedBallToss += testResult.normalizedBallToss;
    this.normalizedBeepTest += testResult.normalizedBeepTest;
    this.normalizedPlankHold += testResult.normalizedPlankHold;
    this.normalizedLongJump += testResult.normalizedLongJump;
  };

  DivideBy = memberCount => {
    this.normalized40yd /= memberCount;
    this.normalizedAgility /= memberCount;
    this.normalizedBallToss /= memberCount;
    this.normalizedBeepTest /= memberCount;
    this.normalizedPlankHold /= memberCount;
    this.normalizedLongJump /= memberCount;
  };
}

export default TestResult;
