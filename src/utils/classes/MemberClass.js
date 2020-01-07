import moment from "moment";
import TestResult from "./TestResultClass";
import ImprovementTestResult from "./ImprovementTestResult";

class Member {
  name = "";

  lastName = "";

  cat = "";

  age = "";

  sex = "";

  pos = "";

  height = "";

  weight = "";

  bfp = "";

  testResults = [];

  formulas = [];

  Init = memberData => {
    this.name = memberData.FirstName;
    this.lastName = memberData.LastName;
    this.cat = memberData.Cat;
    this.age = memberData.Age;
    this.sex = memberData.Sex;
    this.pos = memberData.Pos;
    this.height = memberData.Height;
    this.weight = memberData.Weight;
    this.bfp = memberData.BFP;
    const testResult = new TestResult();
    testResult.Init(memberData);
    this.testResults = [testResult];
    this.CalulateFormula();
  };

  UpdateMemberData = memberData => {
    this.cat = memberData.Cat;
    this.age = memberData.Age;
    this.pos = memberData.Pos;
    this.height = memberData.Height;
    this.weight = memberData.Weight;
    this.bfp = memberData.BFP;
  };

  BhasImprovements = () => this.testResults.length > 1;

  AddTest = memberData => {
    const testResult = new TestResult();
    testResult.Init(memberData);
    this.testResults.push(testResult);
    // ordenar testResult
    this.testResults = this.testResults.sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    this.CalulateFormula();
  };

  CalulateFormula = () => {
    this.formulas = {
      beepTest: this.Vo2MaxFormula(this.testResults[0].beepTest)
    };
  };

  GetImprovements = () => {
    const improvementTestResult = new ImprovementTestResult();
    improvementTestResult.CalculateImprovement(this.testResults);
    return improvementTestResult;
  };

  // VO2MAX (BeepTest)
  Vo2MaxFormula = shuttles => {
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
    let vo2MaxlevelShuttles = {};

    for (const level in shuttlesPerLevel) {
      if (shuttles > shuttlesPerLevel[level]) {
        continue;
      } else if (shuttles == shuttlesPerLevel[level]) {
        vo2MaxlevelShuttles = { level, remmant: 1 };
        break;
      } else {
        vo2MaxlevelShuttles = {
          level: level - 1,
          remmant: shuttles - shuttlesPerLevel[level - 1]
        };
        break;
      }
    }

    const formula =
      3.46 *
        (+vo2MaxlevelShuttles.level +
          +vo2MaxlevelShuttles.remmant /
            (+vo2MaxlevelShuttles.level * 0.4325 + 7.0048)) +
      12.2;

    return `VO2MAX  ${formula.toFixed(2)}`;
  };
}

export default Member;
