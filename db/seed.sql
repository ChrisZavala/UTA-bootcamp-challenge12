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