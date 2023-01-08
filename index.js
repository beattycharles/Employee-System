//1. start app. view all deparments, view all roles
//view all employess, add a deparment, add a role,
//add an employee, update employee role

//2. view all deparment = table shows deparment
//names and ids.

//3. view all roles = job title, role id, deparment of role,
//salary of role.

//4. view all employees =  employee id, first name, last name, job title,
//deparment, salaries, there manager

//5. add department = deparment name added to database
//6.add role = role info name, salary, deparment.
//7. add employee = first name, last name, role, manager
//8. update role = select empolyee update role
const mysql = require("mysql2");
const cTable = require("console.table");
const { default: inquirer } = require("inquirer");
const inquirer = require('inquirer');
const db = require('./connection/connect.js');
let deparmentId;
let managerId;
let updateEmployeeId;
let deparmentList = [];
let roleList = [];
let employeeList = [];



console.log("Ready to Manage Your Company?")
//start inquirer
function StarterQuestions() {
    inquirer
    .prompt([
        {
        type: "list",
        message:"What would you like to do?",
        name: 'options',
        choices: [
            'View all deparments',
            'View all roles',
            'View all employees',
            'Add a deparment',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit',
        ]
    }
])
.then((answers) => {
    if (answers.options === "View all departments") {
      getDepartments();
    } else if (answers.options === "View all roles") {
      getRoles();
    } else if (answers.options === "View all employees") {
      getEmployees();
    } else if (answers.options === "Add a deparment") {
      addDepartment();
    } else if (answers.options === "Add role") {
      addRole();
    } else if (answers.options === "Add an employee") {
      addEmployee();
    } else if (answers.options === "Update an employee role") {
      updateRole();
    } else {
        return;
    }
    })
};
//queries
function getDepartments(){
    db.query('SELECT * FROM department', function (err, results){
        console.table(results);
        deparmentList = results;
        StarterQuestions();
    })
};
function getRoles(){
    db.query('SELECT * FROM roles', function (err, results){
        console.table(results);
        roleList = results;
        StarterQuestions();
    })
};
function getEmployees(){
    db.query('SELECT * FROM employee', function (err, results){
        console.table(results);
        employeeList = results;
        StarterQuestions();
    })
};

function addDepartment(){
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the Department name?',
            name: 'department',
        }
    ])
    .then((answers) =>{
        let newDepartment = answers;
        console.log(newDepartment);
        const { department } = newDepartment;
        db.query('INSERT INTO deparment (name) VALUES (?)', department, function (err, results){
            console.table(results);
            console.log('New Department Added!');
            StarterQuestions();
        })
    })
};

function addRole(){
    db.query('SELECT * FROM department', function (err, results){
        deparmentList = results;
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
            name: "roleDeparment",
            choices: deparmentList,
          },
        ])
        .then((answers) =>{
            let newRole = answers;
            for (let i = 0; i <deparmentList.length; i++){
                if (deparmentList[i].name === newRole.roleDeparment){
                    deparmentId = deparmentList[i].id;
                }
            }
            const { roleName, salary } = newRole;
            db.query('INSERT INTO roles SET ?',
            {
                title: roleName,
                salary: eval(salary),
                deparment_Id: deparmentId
            }, function (err, results){
                console.log(err)
                console.table(results);
                console.log('New Role Added!');
                StarterQuestions();
            })
        })
    })
};

function addEmployee(){
    db.query('SELECT id, first_name, last_name FROM employee', function (err, results){
        employeeList = results.map((employee) => {
            return { name: employee.first_name + " " + employee.last_name, value: employee.id};
        })
        employeeList.push({name:'NONE', value: null});

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
            type: 'list',
            message: 'Employees Manager',
            choices: employeeList
          }
        ])
        .then((answers) =>{
            let newEmployee = answers;
            console.log(newEmployee);
            for (let i = 0; i <roleList.length; i++){
                if (roleList[i].value === newEmployee.employeeRole){
                    roleId = roleList[i].value;
                }
            }
            console.log(roleId);
            for (let i=0; i < employeeList.length; i++){
                if (employeeList[i].value === newEmployee.employeeManger){
                    managerId = employeeList[i].value;
                }
            }
            console.log(mangerId);

            const { firstName, lastName } = newEmployee;
            db.query('INSERT INTO employee SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manger_Id: managerId 
            }, function (err, results){
                console.log(err)
                console.table(results);
                console.log('New Employee Added!');
                StarterQuestions();
            })
        })
    })
};

function updateRole(){
    db.query('SELECT id, title FROM roles', function (err, results){
        roleList = results.map((roles) =>{
            return { name: role.title, value: role.id};
        })
        db.query('SELECT id, first_name, last_name FROM employee', function (err, results){
            employeeList = results.map((employee) => {
                return { name: employee.first_name + " " + employee.last_name, value: employee.id};
            })
        })

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
          }          
        ])
        .then((answers) => {
            let updatedEmployee = answers;

            for (let i = 0; i < employeeList.length; i++) {
                if (employeeList[i].name === updatedEmployee.updateEmployee){
                    updatedEmployee = employeeList[i].value;
                    console.log(employeeList[i].value)                
                }
                }
            for (let i = 0; i < roleList.length; i++) {
                if (roleList[i].name === updatedEmployee.newEmployeeRole){
                    roleId = roleList[i].value;
                }
            }
            console.log('roleId is:' + roleId);

            db.query('UPDATE employee SET role_Id = ? WHERE id = ?',
            [
                roleId,
                updateEmployeeId
            ], function (err, results) {
                console.log(err)
                console.table(results);
                console.log("Employees role is updated!");
                StarterQuestions();
            }
            )
        })
    })
} 

StarterQuestions();