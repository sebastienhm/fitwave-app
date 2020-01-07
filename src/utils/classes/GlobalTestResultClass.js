import TestResult from "./TestResultClass";

class GlobalTestResult extends TestResult {
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

export default GlobalTestResult;
