INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

INSERT INTO employee_role (title, salary, dept_name)
VALUES
    ('Sales Lead', '100000', 'Sales'),
    ('Salesperson', '80000', 'Sales'),
    ('Lead Engineer', '150000', 'Engineering'),
    ('Software Engineer', '120000', 'Engineering'),
    ('Account Manager', '160000', 'Finance'),
    ('Accountant', '125000', 'Finance'),
    ('Legal Team Lead', '250000', 'Legal'),
    ('Lawyer', '190000', 'Legal');

INSERT INTO department (dept_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

