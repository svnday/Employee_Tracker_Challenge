const db = require('./db/connection');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;


console.log("Welcome to your Employee CMS!");

function app() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View all Departments",
                "View All Roles",
                "Search for an Employee",
                "Search for Employees by Manager",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove Employee",
                "Remove Department",
                "Remove Role",
                "Quit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View All Employees":
                    break;
                case "View All Departments":
                    break;
                case "View All Roles":
                    break;
                case "Search for an Employee":
                    break;
                case "Search for Employees by Manager":
                    break;
                case "Add Employee":
                    break;
                case "Add Department":
                    break;
                case "Add Role":
                    break;
                case "Update Employee Role":
                    break;
                case "Update Employee Manager":
                    break;
                case "Remove Employee":
                    break;
                case "Remove Department":
                    break;
                case "Remove Role":
                    break;
                case "Quit":
                    break;
            }
        });
};

app();

// Start server after db connection
db.connect(err => {
    if (err) throw err;
});