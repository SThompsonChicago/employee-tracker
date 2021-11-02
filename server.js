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
            case 'Quit':
                process.exit();
                break;
        }
    });
}

function showEmployees() {
    db.query('SELECT * FROM employees', function (err, res) {
        console.log('\n');
        console.table(res);
        menu();
    });
}

function showRoles() {
    db.query('SELECT * FROM role', function (err, res) {
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


menu();

