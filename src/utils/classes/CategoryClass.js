import TestResult from "./TestResultClass";
import Member from "./MemberClass";

class Category {
  members = [];

  catStats = {};

  MemberExists = currentMember => {
    const currMember = this.members.filter(member => {
      if (
        member.name == currentMember.FirstName &&
        member.lastName == currentMember.LastName &&
        member.cat == currentMember.Cat
      ) {
        return true;
      }
      return false;
    });

    if (currMember.length > 0) {
      return currMember[0];
    }

    return false;
  };

  AddMember = memberData => {
    const memberIfExists = this.MemberExists(memberData);
    if (memberIfExists) {
      memberIfExists.AddTest(memberData);
      memberIfExists.UpdateMemberData(memberData);
    } else {
      const member = new Member();
      member.Init(memberData);
      this.members.push(member);
    }
  };

  CategoryStats = () => {
    const testResult = new TestResult();
    this.catStats = this.members.reduce((result, value) => {
      result.Aggregate(value.testResults[value.testResults.length - 1]);
      return result;
    }, testResult);
    this.catStats.DivideBy(this.members.length);
    this.catStats.GetOverall();
  };
}

export default Category;
