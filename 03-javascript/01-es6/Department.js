import Employee from './Employee.js';

export default class Department extends Employee {
  constructor(name, deptName) {
    super(name);
    this.deptName = deptName;
  }

  departmentDetails() {
    console.log(`${this.name} works in ${this.deptName}`);
  }
}
