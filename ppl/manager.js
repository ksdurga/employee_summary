const Employee = require("./employee");

//extends employee class to add office phone num
class Manager extends Employee {
  constructor(id, name, email, officeNum) {
    super(id, name, email);
    this.officeNum = officeNum;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNum() {
    return this.officeNum;
  }
}

module.exports = Manager;