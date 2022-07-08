const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
// const console.table = require('console.table');


const promptMessages = {
    viewAllEmployees: 'View all employees',
    viewAllEmployeesByManager: 'View all employees by manager',
    viewbyDepartment: 'View all employees by department',
    viewAllDepartments: 'View all departments',
    viewAllRoles: 'View all roles',
    addEmployee: 'Add employee',
    removeEmployee: 'Remove employee',
    updateEmployeeManager: 'Update employee Manager',
    updateAllRoles: 'Update all roles',
    exit: 'Exit'
};

const connection = mysql.createConnection({
    host: 'localhost',

    // your port; if not 3306
    port: 3001,  
    
    // your username
    user: 'root',

    // your password
    password: 'root',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    prompt();
});

function prompt() {
    inquirer.prompt({
        name:'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            promptMessages.viewAllEmployees,
            promptMessages.viewAllEmployeesByManager,
            promptMessages.viewbyDepartment,
            promptMessages.viewAllDepartments,
            promptMessages.viewAllRoles,
            promptMessages.addEmployee,
            promptMessages.removeEmployee,
            promtMessages.updateRole,
            promptMessages.exit
        ]

    })
    .then(answer => {
        console.log('answer', answer);
        switch (answer.action) {
            case promptMessages.viewAllEmployees:
                viewAllEmployees();
                break;

            case promptMessages.viewAllEmployeesByManager:  
                viewAllEmployeesByManager();
                break;

            case promptMessages.viewbyDepartment:
                viewbyDepartment();
                break;

            case promptMessages.viewAllDepartments:
                viewAllDepartments();
                break;

            case promptMessages.viewAllRoles:
                viewAllRoles();
                break;

            case promptMessages.addEmployee:
                addEmployee();
                break;

            case promptMessages.removeEmployee:
                removeEmployee();
                break;

            case promptMessages.updateRole:
                updateRole();
                break;

            case promptMessages.exit:
                connection.end();
                break;
        }
    }); 
}

function viewAllEmployees() {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '' , manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

function viewByManager() {
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY MANAGER');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

    function viewAllRoles() {
        const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
        FROM employee
        LEFT JOIN role ON (role.id = employee.role_id)
        LEFT JOIN department ON (department.id = role.department_id)
        ORDER BY role.title;`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW EMPLOYEE BY ROLE');
            console.log('\n');
            console.table(res);
            prompt();
        });
    
    }

    async function addEmployee() {
        const addname = await inquirer.prompt(askName());
        connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', asyn,(err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: () => { res.map(res => res.title),
                        message: 'What is the employee role?:'
                    }
            ]);
            let roleId;
            for (const row of res) {
                if (row.title === role) {
                    roleId = row.id;
                    continue;
                }
            }
            
            connection.query('SELECT * FROM employee', async (err, res) => {
                if (err) throw err;
                let choices = res.map(res => '${res.first_name} ${res.last_name}');
                choices.push('none);
                let {manager} = await inquirer.prompt([
                    {
                        name: 'manager',
                        type: 'list',
                        choices: choices,
                        message: 'Who is the employee manager?:'
                        }
                        ]);
                        let managerId;
                        let managerName;
                        if (manager === 'none') {
                            managerId = null;
                        } else {
                            for ()
                        }

            ))