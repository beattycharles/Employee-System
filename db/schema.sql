DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE  company_db;

CREATE TABLE deparment(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    deparment_id INT NOT NULL 
    FOREIGN KEY(deparment_id)
    REFERENCES deparment(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
    manager_id INT,
    FOREIGN KEY(manager_id),
    REFERENCES employee(id),
    ON DELETE CASCADE,
);