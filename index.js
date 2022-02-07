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
                "View all Employees",
                "View all Departments",
                "View all Roles",
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
                case "View all Employees":
                    allEmployees();
                    break;
                case "View all Departments":
                    allDepts();
                    break;
                case "View all Roles":
                    allRoles();
                    break;
                case "Search for Employees by Manager":
                    managerSearch();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Update Employee Manager":
                    updateManager();
                    break;
                case "Remove Employee":
                    deleteEmployee();
                    break;
                case "Remove Department":
                    deleteDept();
                    break;
                case "Remove Role":
                    deleteRole();
                    break;
                case "Quit":
                    console.log('Goodbye!');
                    db.end();
                    break;
            }
        });
};

function allEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dept_name, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee 
                LEFT JOIN employee_role
                ON employee.role_id = employee_role.id
                LEFT JOIN department
                ON employee_role.dept_id = department.id
                LEFT JOIN employee AS manager 
                ON employee.manager_id = manager.id
    `;
    db.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    app();
};

function allDepts() {
    const sql= `SELECT * FROM department`;
    db.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    app();
};

function allRoles() {
    const sql= `SELECT * FROM employee_role`;
    db.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    app();
}


function managerSearch() {
    inquirer
        .prompt({
            name: 'searchManager',
            type: 'list',
            message: 'View employees by Manager',
            choices: [
                {name: 'John Doe', value: 1}, 
                {name: 'Ashley Rodriguez', value: 3}, 
                {name: 'Kunal Singh', value: 5}, 
                {name: 'Sarah Lourd', value: 7}
            ]})
        .then(function(answer) {
            const sql = `SELECT * FROM employee WHERE manager_id =?`;
            db.query(sql, [parseInt(answer.searchManager)], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app()
        });
};

/* I couldn't figure this out but will come back to it
function departmentSearch() {
    inquirer
        .prompt({
            name: 'searchDept',
            type: 'list',
            message: 'View employees by Department',
            choices: [
                {name: 'Sales', value: 1}, 
                {name: 'Engineering', value: 2}, 
                {name: 'Finance', value: 3}, 
                {name: 'Legal', value: 4}
            ]})
        .then(function(answer) {
            const sql = `SELECT * FROM department WHERE dept_id = ?`;
            db.query(sql, [answer.searchDept], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app()
        });
}
*/

function addEmployee() {
    inquirer
        .prompt([{
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'role_id',
            type: 'list',
            message: "What is the employee's role?",
            choices: [
                {name: 'Sales Lead', value: 1},
                {name: 'Salesperson', value: 2},
                {name: 'Lead Engineer', value: 3},
                {name: 'Software Engineer', value: 4},
                {name: 'Account Manager', value: 5},
                {name: 'Accountant', value: 6},
                {name: 'Legal Team Lead', value: 7},
                {name: 'Lawyer', value: 8},
            ]
        },
        {
            name: 'manager_id',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: [
                {name: 'John Doe', value: 1}, 
                {name: 'Ashley Rodriguez', value: 3}, 
                {name: 'Kunal Singh', value: 5}, 
                {name: 'Sarah Lourd', value: 7}
            ]
        }
    ])
    .then(function(answer) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        db.query(sql, [answer.firstName, answer.lastName, parseInt(answer.role_id), parseInt(answer.manager_id)], function(err, res) {
            if (err) throw err;
            console.log(res);
        })
        app();
    })
};

function addDept() {
    inquirer
        .prompt({
            name: "dept_name",
            type: "input",
            message: "What is the name of the department you want to add?"
        })
        .then(function(answer) {
            const sql = `INSERT INTO department (dept_name) VALUES (?)`;
            db.query(sql, [answer.dept_name], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            app();
        })
};

function addRole() {
    inquirer
        .prompt([{
            name: 'role',
            type: 'input',
            message: 'What is the name of the new role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the annual salary for this role?'
        },
        {
            name: 'dept_name',
            type: 'list',
            message: 'What department is this role under?',
            choices: [
                {name: 'Sales', value: 1}, 
                {name: 'Engineering', value: 2}, 
                {name: 'Finance', value: 3}, 
                {name: 'Legal', value: 4}
            ]
        }
    ])
    .then(function(answer) {
        const sql = `INSERT INTO employee_role (title, salary, dept_id) VALUES (?,?,?)`;
        db.query(sql, [answer.role, answer.salary, parseInt(answer.dept_name)], function(err, res) {
            if (err) throw err;
            console.table(res);
        })
        app();
    })
};

function updateRole() {
    inquirer
        .prompt([{
            name: 'employeeName',
            type: 'list',
            message: "Which employee's role would you like to update?",
            choices: [
                {name: 'John Doe', value: 1},
                {name: 'Mike Chan', value: 2},
                {name: 'Ashley Rodriguez', value: 3},
                {name: 'Kevin Tupik', value: 4},
                {name: 'Kunal Singh', value: 5},
                {name: 'Malia Brown', value: 6},
                {name: 'Sarah Lourd', value: 7},
                {name: 'Tom Allen', value: 8}
            ]
        },
        {
            name: 'title',
            type: 'list',
            message: 'Which role do you want to assign to the selected employee?',
            choices: [
                {name: 'Sales Lead', value: 1},
                {name: 'Salesperson', value: 2},
                {name: 'Lead Engineer', value: 3},
                {name: 'Software Engineer', value: 4},
                {name: 'Account Manager', value: 5},
                {name: 'Accountant', value: 6},
                {name: 'Legal Team Lead', value: 7},
                {name: 'Lawyer', value: 8}
            ]
        }
    ])
        .then(function(answer) {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            db.query(sql, [parseInt(answer.title), parseInt(answer.employeeName)], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
        app();
    });
};

function updateManager() {
    inquirer
        .prompt([{
            name: 'employeeName',
            type: 'list',
            message: "Which employee's manager would you like to update?",
            choices: [
                {name: 'John Doe', value: 1},
                {name: 'Mike Chan', value: 2},
                {name: 'Ashley Rodriguez', value: 3},
                {name: 'Kevin Tupik', value: 4},
                {name: 'Kunal Singh', value: 5},
                {name: 'Malia Brown', value: 6},
                {name: 'Sarah Lourd', value: 7},
                {name: 'Tom Allen', value: 8}
            ]
        },
        {
            name: 'managerName',
            type: 'list',
            message: "Who is the employee's new manager?",
            choices: [
                {name: 'John Doe', value: 1}, 
                {name: 'Ashley Rodriguez', value: 3}, 
                {name: 'Kunal Singh', value: 5}, 
                {name: 'Sarah Lourd', value: 7}
            ]
        }
    ])
        .then(function(answer) {
            sql = `UPDATE employee SET manager_id = ? where id = ?`;
            db.query(sql, [parseInt(answer.managerName), parseInt(answer.employeeName)], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app();
        });
};

function deleteEmployee() {
    inquirer
        .prompt([{
            name: 'employeeId',
            type: 'input',
            message: "What is the employee's ID number?"
        }])
        .then(function(answer) {
            const sql = `DELETE FROM employee WHERE id = ?`;
            db.query(sql, parseInt(answer.employeeId), function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app();
        });
};

function deleteDept() {
    inquirer
        .prompt({
            name: 'dept_name',
            name: 'input',
            message: 'What is the name of the department you would like to delete?'
        })
        .then(function(answer) {
            const sql = `DELETE FROM department WHERE dept_name = ?`
            db.query(sql, [answer.dept_name], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app();
        });
};

function deleteRole() {
    inquirer
        .prompt({
            name: 'roleName',
            type: 'input',
            message: 'Which role would you like to delete?'
        })
        .then(function(answer) {
            const sql = `DELETE FROM employee_role WHERE title = ?`;
            db.query(sql, [answer.roleName], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            app();
        });
};




app();

// Start server after db connection
db.connect(err => {
    if (err) throw err;
});