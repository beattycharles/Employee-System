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
const express = require('express');
const mysql = require("mysql2");
const cTable = require("console.table");
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20

//middle ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})