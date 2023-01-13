INSERT INTO department(id, title)
VALUES (1,'Geek Squad'),
       (2, 'Customer Service');

INSERT INTO roles(title, salary, department_id)
VALUES  ('CIA Specialist', 40000, 1),
        ("Consultation Agent", 26000, 1),
        ('Repair Agent', 30000, 1),
        ('Lead', 30000, 2),
        ('Checkout', 20000, 2),
        ('Curbside', 20000, 2);

INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUES ('Mike', 'Morrone', 1, null),
        ('Charles', 'Beatty', 2, 1 ),
        ('Matthew', 'Magg', 3, 1),
        ('Marie', 'Carol', 4, null),
        ('Lexi', 'Logi', 5, 4),
        ('Josh', 'McGrady', 6, 4);