//1. start app. view all departments, view all roles
//view all employees, add a department, add a role,
//add an employee, update employee role

//2. view all department = table shows department
//names and ids.

//3. view all roles = job title, role id, department of role,
//salary of role.

//4. view all employees =  employee id, first name, last name, job title,
//deparment, salaries, there manager

//5. add department = deparment name added to database
//6.add role = role info name, salary, deparment.
//7. add employee = first name, last name, role, manager
//8. update role = select empolyee update role
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const db = require("./connection/connect.js");
let departmentId;
let managerId;
let updateEmployeeId;
let departmentList = [];
let roleList = [];
let employeeList = [];

console.log("Ready to Manage Your Company?");
//start inquirer
function StarterQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      if (answers.options === "View all departments") {
        getDepartments();
      } else if (answers.options === "View all roles") {
        getRoles();
      } else if (answers.options === "View all employees") {
        getEmployees();
      } else if (answers.options === "Add a department") {
        addDepartment();
      } else if (answers.options === "Add a role") {
        addRole();
      } else if (answers.options === "Add an employee") {
        addEmployee();
      } else if (answers.options === "Update an employee role") {
        updateRole();
      } else {
        db.end();
        return;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
//queries
function getDepartments() {
  db.query("SELECT * FROM department;", (err, results) => {
    if (err) throw err;
    // console.log(results);
    console.table(results);
    // deparmentList = results;
    StarterQuestions();
  });
}
function getRoles() {
  db.query(
    "SELECT roles.id, roles.title, roles.salary, roles.department_id AS Department FROM roles JOIN roles ON roles.department_id = department.title;",
    function (err, results) {
      console.table(results);
      roleList = results;
      StarterQuestions();
    }
  );
}
function getEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    employeeList = results;
    StarterQuestions();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Department name?",
        name: "department",
      },
    ])
    .then((answers) => {
      let newDepartment = answers;
      console.log(newDepartment);
      const { department } = newDepartment;
      db.query(
        "INSERT INTO deparment (name) VALUES (?)",
        department,
        function (err, results) {
          console.table(results);
          console.log("New Department Added!");
          StarterQuestions();
        }
      );
    });
}

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    deparmentList = results.map((result) => {
      return result.title;
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name of Role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "Salary of the Role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Department role is under?",
          name: "roleDepartment",
          choices: departmentList,
        },
      ])
      .then((answers) => {
        let newRole = answers;
        for (let i = 0; i < departmentList.length; i++) {
          if (departmentList[i].name === newRole.roleDepartment) {
            departmentId = departmentList[i].id;
          }
        }
        const { roleName, salary, roleDepartment } = newRole;
        db.query(
          "INSERT INTO roles SET ?",
          {
            title: roleName,
            salary: eval(salary),
            department_id: roleDepartment,
          },
          function (err, results) {
            console.log("New Role Added!");
            StarterQuestions();
          }
        );
      });
  });
}

function addEmployee() {
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, results) {
      employeeList = results.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      employeeList.push({ name: "NONE", value: null });

      db.query("SELECT id, title FROM roles", function (err, results) {
        roleList = results.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        inquirer
          .prompt([
            {
              type: "input",
              message: "Employees first name?",
              name: "firstName",
            },
            {
              type: "input",
              message: "Employees last name?",
              name: "lastName",
            },
            {
              type: "list",
              message: "Employees role in the company?",
              name: "employeeRole",
              choices: roleList,
            },
            {
              type: "list",
              message: "Employees Manager",
              name: "employeeManager",
              choices: employeeList,
            },
          ])
          .then((answers) => {
            let newEmployee = answers;

            const { firstName, lastName } = newEmployee;
            db.query(
              "INSERT INTO employee SET ?",
              {
                first_name: firstName,
                last_name: lastName,
                roles_id: newEmployee.employeeRole,
                manager_Id: newEmployee.employeeManager,
              },
              function (err, results) {
                if (err) console.error(err);
                console.log("New Employee Added!");
                StarterQuestions();
              }
            );
          });
      });
    }
  );
}

function updateRole() {
  db.query("SELECT id, title FROM roles", function (err, results) {
    roleList = results.map((role) => {
      return { name: role.title, value: role.id };
    });
    db.query(
      "SELECT id, first_name, last_name FROM employee",
      function (err, results) {
        employeeList = results.map((employee) => {
          return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          };
        });

        inquirer
          .prompt([
            {
              type: "list",
              message: "Select employee to update",
              name: "updateEmployee",
              choices: employeeList,
            },
            {
              type: "list",
              message: "Employees new role?",
              name: "newEmployeeRole",
              choices: roleList,
            },
          ])
          .then((answers) => {
            db.query(
              "UPDATE employee SET roles_Id = ? WHERE id = ?",
              [answers.newEmployeeRole, answers.updateEmployee],
              function (err, results) {
                console.log("Employees role is updated!");
                StarterQuestions();
              }
            );
          });
      }
    );
  });
}

StarterQuestions();
