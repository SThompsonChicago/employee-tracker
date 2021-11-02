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

function showEmployees() {
    db.query('SELECT * FROM workers', function (err, res) {
        console.log('\n')
        console.table(res);
    });
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
        return data.what
    });
    
}

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
        if (data.what === 'View All Employees'){
            var next = showEmployees();
        }
    });
}


menu();

