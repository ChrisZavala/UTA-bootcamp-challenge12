DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);

USE employee_db;
INSERT INTO department (name)
VALUES      ("Engineering"),
            ("Finance"),
            ("Legal"),
            ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES      ("Senior Engineer", 300000, 01),
            ("Software Engineer", 200000, 02),
            ("Lead Sales", 100000, 03),
            ("Account Manager", 150000, 04),
            ("Accountant", 100000, 05),
            ("Lawyer", 250000, 06);
            

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES      ("Kevin", "Mitnik", 1, NULL),
            ("Johnny", "Shankers", 2, 1),
            ("Enrico", "Fermi", 2, 1),
            ("Cristiano", "De La Fuente", 3, NULL),
            ("Lita", "Ford", 4, NULL),
            ("Joe Dee", "Foster", 5, 5),
            ("Chon", "Mee", 5, 5),
            ("Wiley", "Dufrane", 6, 4),
            ("Paul", "Escobar", 7, 8),
            ("Homer", "Simpson", 7, 8);
