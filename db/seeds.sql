INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", "100000", 1),
        (2, "Salesperson", "80000", 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, null),
        (2, "Mike", "Chan", 2, 1);