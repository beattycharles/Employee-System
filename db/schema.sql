SET foreign_key_checks = 0;
DROP DATABASE IF EXISTS company_db;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;
CREATE DATABASE company_db;
SET foreign_key_checks = 1;
USE company_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    CONSTRAINT fk_roles_id FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager_id FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE CASCADE
);