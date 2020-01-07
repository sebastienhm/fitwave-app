import TestResult from "./TestResultClass";

class ImprovementTestResult extends TestResult {
  CalculateImprovement = arrayTestResuts => {
    // sacar los dos ultimos testResults
    const lastTwoTestResults = arrayTestResuts.slice(-2);

    const clamp = (result, min, max) =>
      Math.min(Math.max(result, min), max).toFixed(2);

    this.improvement40yd = clamp(
      ((lastTwoTestResults[1]["40yd"] - lastTwoTestResults[0]["40yd"]) /
        lastTwoTestResults[0]["40yd"]) *
        -1 *
        100,
      -100,
      100
    );
    this.improvementAgility = clamp(
      ((lastTwoTestResults[1].agility - lastTwoTestResults[0].agility) /
        lastTwoTestResults[0].agility) *
        -1 *
        100,
      -100,
      100
    );
    this.improvementBallToss = clamp(
      ((lastTwoTestResults[1].ballToss - lastTwoTestResults[0].ballToss) /
        lastTwoTestResults[0].ballToss) *
        100,
      -100,
      100
    );

    this.improvementBeepTest = clamp(
      ((lastTwoTestResults[1].beepTest - lastTwoTestResults[0].beepTest) /
        lastTwoTestResults[0].beepTest) *
        100,
      -100,
      100
    );
    this.improvementPlankHold = clamp(
      ((lastTwoTestResults[1].plankHold - lastTwoTestResults[0].plankHold) /
        lastTwoTestResults[0].plankHold) *
        100,
      -100,
      100
    );
    this.improvementLongJump = clamp(
      ((lastTwoTestResults[1].longJump - lastTwoTestResults[0].longJump) /
        lastTwoTestResults[0].longJump) *
        100,
      -100,
      100
    );
  };
}

export default ImprovementTestResult;
