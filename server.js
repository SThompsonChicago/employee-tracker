const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db database.')
)

function menu() {
    console.log('')
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'what',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
    .then((data) => {
        switch (data.what) {
            case 'View All Employees':
                showEmployees();
                break;
            case 'View All Roles':
                showRoles();
                break;
            case 'View All Departments':
                showDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Quit':
                process.exit();
                break;
        }
    });
}

function showEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, employees.manager_name FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id', function (err, res) {
        console.log('\n');
        console.table(res);
        menu();
    });
}

function showRoles() {
    db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function (err, res) {
        console.log('\n');
        console.table(res);
        menu();
    });
}

function showDepartments() {
    db.query('SELECT * FROM department', function (err, res) {
        console.log('\n');
        console.table(res);
        menu();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
        type: 'input',
        message: 'What is the name of the Department?',
        name: 'newDepartment'
        }
    ]).then(function(data) {
        const query = db.query(
            "INSERT INTO department SET ? ",
            {
                name: data.newDepartment
            },
            function(err) {
                if (err) throw err
                console.log(`Added ${data.newDepartment} to the database.`);
                menu();
            }
        )
    });
}



function addRole() {
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'newRole'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'newSalary'
    },
    {
        type: 'input',
        message: 'To which department does the role belong?',
        name: 'newDept'
    }
    ])
    .then((data) => {
        console.log(`Added ${data.newRole} to the database.`);
        menu();
    });
}

function addEmployee() {
    inquirer
    .prompt([
        {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'newFirst'
    },
    {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'newLast'
    },
    {
        type: 'input',
        message: `What is the employee's role?`,
        name: 'newRole'
    },
    {
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'newDept'
    }
    ])
    .then((data) => {
        console.log(`Added ${data.newFirst} ${data.newLast} to the database.`);
        menu();
    });
}

function updateEmployeeRole(){
    inquirer
    .prompt([
        {
        type: 'input',
        message: `Which employee's role would you like to update?`,
        name: 'new1'
    },
    {
        type: 'input',
        message: `Which role do you want to assign to the selected employee?`,
        name: 'new2'
    }
    ])
    .then((data) => {
        console.log(`Updated ${data.new1}'s role.`);
        menu();
    });
}


menu();



