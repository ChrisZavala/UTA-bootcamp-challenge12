USE employee_db;

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("HR"),
       ("IT"),
       ("Security");

INSERT INTO role (title, salary, department_id)
VALUES ('CEO Senior Engineer', 425000, 1),
       ('Electrical Engineer', 200000, 1),
       ('Software Engineer', 185000, 1),
       ('Lawyer', 300000, 3),
       ('Accountant', 125000, 2),
       ('HR Rep', 100000, 4),
       ('Director of IT', 250000, 5),
       ('Head of Security', 115000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Mitnik', 1, NULL),
       ('Jack', 'Kilby', 2, 1),
       ('Joe Dee', 'Foster', 3, 1),
       ('Rick', 'Roll', 4, 1),
       ('Cristian','De La Fuente', 5, 1),
       ('Hunter S.', 'Thompson', 6, 1),
       ('Steve', 'Wozniak', 7, NULL),
       ('Pablo', 'Escobar', 8, NULL);