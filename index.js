// Variable declaration: 
const inquirer = require("inquirer");
const employeeDatabase = require("./lib/db");

//need to log into the employee Database: 
const db = new employeeDatabase({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "longhorn1",
    database: "employee_db"
});

