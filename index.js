const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./ppl/employee");
const Manager = require("./ppl/manager");
const Engineer = require("./ppl/engineer");
const Intern = require("./ppl/intern");

//Array of question objects
const managerQuestions = [
  {
    type: "input",
    message: "What is the manager's ID number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the manager's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the manager's email?",
    name: "email"
  },
  {
    type: "input",
    message: "What is their office number?",
    name: "officeNum"
  }
];

const questions = [
  {
    type: "input",
    message: "What is the employee's ID number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email"
  },
  {
    type: "list",
    message: "Pick a job title:",
    choices: ["Engineer", "Intern"],
    name: "title"
  }
];


showQuestions = () => {
  inquirer.prompt(managerQuestions).then(function(managerAnswer) {
    let newManager = createManager(managerAnswer);
    let writeData = [
      `Name: ${newManager.getName()}`,
      `ID: ${newManager.getId()}`,
      `Email: ${newManager.getEmail()}`,
      `Role: ${newManager.getRole()}`,
      `Office Number: ${newManager.officeNum}`,
      "-".repeat(40),
      `\n`
    ].join("\n");
    fs.appendFile("log.txt", writeData, err => {
      if (err) throw err;
    });
    completeQuestions();
  });
};
showQuestions();

//Function to exit series of questions or add more employees
completeQuestions = () => {
  inquirer
    .prompt({
      type: "confirm",
      message: "Do you want to add another employee?",
      name: "confirmation"
    })
    .then(answers => {
      if (answers.confirmation === false) {
        return console.log(
          "Completed creating team, see log.txt file."
        );
      } else {
        console.log("Employee successfully added");
        employeeQuestions();
      }
    });
};

employeeQuestions = () => {
  inquirer.prompt(questions).then(function(answers) {
    switch (answers.title) {
      case "Engineer":
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is their Github user name?",
              name: "github"
            }
          ])
          .then(function(engineerAnswer) {
            let newEngineer = createEngineer(answers, engineerAnswer);
            let writeData = [
              `Name: ${newEngineer.getName()}`,
              `ID: ${newEngineer.getId()}`,
              `Email: ${newEngineer.getEmail()}`,
              `Role: ${newEngineer.getRole()}`,
              `Github Username: ${newEngineer.getGithub()}`,
              "-".repeat(40),
              `\n`
            ].join("\n");
            fs.appendFile("log.txt", writeData, err => {
              if (err) throw err;
            });
            completeQuestions();
          });
        break;
      case "Intern":
        inquirer
          .prompt([
            {
              type: "input",
              message: "What school did they attend?",
              name: "school"
            }
          ])
          .then(function(internAnswer) {
            let newIntern = createIntern(answers, internAnswer);
            let writeData = [
              `Name: ${newIntern.getName()}`,
              `ID: ${newIntern.getId()}`,
              `Email: ${newIntern.getEmail()}`,
              `Role: ${newIntern.getRole()}`,
              `School: ${newIntern.getSchool()}`,
              "-".repeat(40),
              `\n`
            ].join("\n");
            fs.appendFile("log.txt", writeData, err => {
              if (err) throw err;
            });
            completeQuestions();
          });
        break;
      default:
        console.log("Please select an answer");
    }
  });
};

//Gets user input and returns it
let createManager = managerAnswer => {
  let newManager = new Manager(
    managerAnswer.id,
    managerAnswer.name,
    managerAnswer.email,
    managerAnswer.officeNum
  );
  return newManager;
};

let createEngineer = (answers, engineerAnswer) => {
  let newEngineer = new Engineer(
    answers.id,
    answers.name,
    answers.email,
    engineerAnswer.github
  );
  return newEngineer;
};

let createIntern = (answers, internAnswer) => {
  let newIntern = new Intern(
    answers.id,
    answers.name,
    answers.email,
    internAnswer.school
  );
  return newIntern;
};