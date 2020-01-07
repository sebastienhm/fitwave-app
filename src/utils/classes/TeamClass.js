import Category from "./CategoryClass";

class Team {
  // properties
  categories = {};

  allMembers = new Category();

  // getters and setters
  Init = jsonData => {
    // JSON DATA
    this.categories = jsonData.reduce((catObject, value) => {
      if (value.Cat in catObject) {
        catObject[value.Cat].AddMember(value);
      } else {
        catObject[value.Cat] = new Category(value.Cat);
        catObject[value.Cat].AddMember(value);
      }
      return catObject;
    }, {});

    jsonData.forEach(element => {
      this.allMembers.AddMember(element);
    });

    // get the overall of the team
    this.allMembers.CategoryStats();

    // get the overall of every Category
    for (const key in this.categories) {
      this.categories[key].CategoryStats();
    }
  };
}

export default Team;
