INSERT INTO department (name)
VALUES      ("Engineering"),
            ("Finance"),
            ("Legal"),
            ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES      ("Sales Lead", 100000, 4)
            ("Sales Person", 80000, 4),
            ("Senior Engineer", 200000, 1),
            ("Account Manager", 150000, 2),
            ("Accountant", 100000, 2),
            ("Senior Lawyer", 250000, 3),
            ("Lawyer", 175000, 3);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES      ("Kevin", "Mitnik", 1, NULL),
            ("Johnny", "Shankers", 2, 1),
            ("Enrico", "Fermi", 2, 1),
            ("Cristiano", "De La Fuente", 3, NULL)
            ("Lita", "Ford", 4, NULL)
            ("Joe Dee", "Foster", 5, 5),
            ("Chon", "Mee", 5, 5)
            ("Wiley", "Dufrane", 6, NULL),
            ("Paul", "Escobar", 7, 8),
            ("Homer", "Simpson", 7, 8);
