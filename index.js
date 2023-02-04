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
//kills my database connection when the app is stopped. 
process.on("exit", async function(code) {
    await db.close();
    return console.log(`You are going to exit with code ${code}`);
});

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
//getRemoveEmployeeInfo()
async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeName",
            message: "Which employee do you want to remove?",
            choices: [
                ...employees
            ]
        }
    ])
}
//getUpdateEmployeeRoleInfo()
async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeName",
            message: "Which employee do you want to update",
            choices: [
                ...employees
            ]
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's new role?",
            choices: [
                ...roles
            ]
        }
    ])
}
//viewAllDepartments()
//viewAllEmployees()
//viewAllEmployeesByDepartment()
//viewAllRoles()
//will put these with all the functions that are calling the database. 


//This is the hard section for sure. Going to start writing 17 functions that are making calls to the database. On paper that is what I have. 

//going to start with all the get(s)
//getRoles()
async function getRoles() {
    try{
        const rows = await db.query("SELECT title FROM role");
        let roles = [];
        for(const row of rows){
            roles.push(row.title);
        }
        return roles;
    } catch (err) {
        console.log(err);
    }
}
//getManagerNames()
async function getManagerNames() {
    try{
        const rows = await db.query("SELECT * FROM employee WHERE manager_id IS NULL");
        let employeeNames = [];
        for(const employee of rows){
            employeeNames.push(employee.first_name + " "+ employee.last_name);
        }
        return employeeNames;
    } catch (err) {
        console.log(err);
    }
}
//getDepartmentNames()
async function getDepartmentNames() {
    try{
        const rows = await db.query("SELECT name FROM department");
        let departments = [];
        for(const row of rows){
            departments.push(row.name);
        }
        return departments;
    } catch (err) {
        console.log(err);
    }
}
//getDepartmentId()
async function getDepartmentId(departmentName) {
    try{
        const args = [departmentName];
        const rows = await db.query("SELECT * FROM department WHERE department.name=?", args);
        return rows[0].id;
    }catch (err) {
        console.log(err);
    }
}
//getRoleId()
async function getRoleId(roleName) {
    try{
        const args = [roleName];
        const rows = await db.query("SELECT * FROM role WHERE role.title=?", args);
        return rows[0].id;
    }catch (err) {
        console.log(err);
    }
}
//getEmployeeNames()
async function getEmployeeNames() {
    try{
        const rows = await db.query("SELECT * FROM employee");
        const employeeNames = [];
        for(const employee of rows) {
            employeeNames.push(employee.first_name + " " + employee.last_name);
        }
        return employeeNames;
    } catch (err) {
        console.log(err);
    }
}
//getEmployeeId
async function getEmployeeId(fullName) {
    try{
        const employee = getFirstandLastName(fullName);
        const args = [employee[0], employee[1]];
        const rows = await db.query("SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name", args);
        return rows[0].id;
    } catch (err) {
        console.log(err);
    }
}
//All my views are coming!
//viewAllRoles()
async function viewAllRoles() {
    try{
        const rows = await db.query(
            `SELECT role.title, role.id AS 'role.id', role.salary, department.name AS department
            from role LEFT JOIN department ON role.department_id = department.id`
        );
        console.table(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
//viewAllDepartments()
async function viewAllDepartments() {
    try {
        const rows = await db.query("SELECT * FROM department");
        console.table(rows);
        return rows;
    } catch (err) {
        console.log(err);
    } 
}
//viewAllEmployees()
async function viewAllEmployees() {
    try {   
        const rows = await db.query(
            `SELECT employee.id, employee.first_name AS "first name", employee.last_name
                AS "last name", role.title, department.name AS department, role.salary,
                concat(manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id
                LEFT JOIN department
                ON role.department_id = department.id
                LEFT JOIN employee manager
                ON manager.id = employee.manager_id`);
        console.table(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }

}








async function viewAllDepartments() {
    try {
        const result = await db.query("SELECT * FROM department");
        console.table(result);
    } catch (err) {
        console.log(err);
        
    }
    startApp();
}






startApp();