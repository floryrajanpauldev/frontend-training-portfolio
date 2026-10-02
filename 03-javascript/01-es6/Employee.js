export default class Employee {
  constructor(name) {
    this.name = name;
  }

  salaryCalc() {
    console.log(`${this.name}'s salary calculation`);
  }
}
