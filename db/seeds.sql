INSERT INTO department (id, name)
VALUES (1, "Sales"),
        (2, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
        (2, "Salesperson", 80000, 1),
        (3, "Lead Engineer", 150000, 2),
        (4, "Software Engineer", 120000, 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id, manager_name)
VALUES (1, "John", "Doe", 1, null, null),
        (2, "Mike", "Chan", 2, 1, "John Doe"),
        (3, "Ashley", "Rodriguez", 3, null, null),
        (4, "Kevin", "Tupnik", 4, 3, "Ashley Rodriquez");