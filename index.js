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

//start the Prompt of questions: 
async function startQuestions() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "Add Department",
                "Add Employee",
                "Add Role",
                "Remove Employee",
                "Update Employee Role",
                "View All Departments",
                "View All Employees",
                "View All Employees By Department",
                "View All Roles",
                "Exit"
            ]
        }
    ])
}//End of the prompt questions. 

//Start App
async function startApp() {
    let exit  = false; 
    while(!exit) {
        const prompt = await startQuestions();

        //Start the switch/case for 'get' all info: 
        switch(prompt.action) {
            case 'Add Department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break
            }
            case 'Add Employee': {
                const newEmployee = await getAddEmployeeInfo();
                await addEmployee(newEmployee);
                break;
            }
            case 'Add Role': {
                const newRole = await getRoleInfo();
                await addRole(newRole);
                break;
            }
            case 'Remove Employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }
            case 'Update Employee Role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }
            case 'View All Departments': {
                await viewAllDepartments();
                break;
            }
            case 'View All Employees': {
                await viewAllEmployees();
                break;
            }
            case 'View All Employees By Department': {
                await viewAllEmployeesByDepartment();
                break;
            }
            case 'View All Roles': {
                await viewAllRoles();
                break;
            }
            case 'Exit': {
                exit = true;
                return;
            }
            default: console.log(`An Error has happened in processing your request, this caused ${prompt.action}`);
        }
    }
}

//functions listed above starting from the beginning

//getDepartmentInfo()
async function getDepartmentInfo() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ])
}

//getAddEmployeeInfo()
async function getAddEmployeeInfo() {
    const managers = await getManagerNames()
    const roles = await getRoles();
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: [
                ...roles
            ]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: [
                ...managers
            ]
        }
    ])
}

//getRoleInfo()
async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "list",
            name: "departmentName",
            message: "Which department uses this role?",
            choices: [
                ...departments
            ]
        }
    ])
}



startApp();