DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;
 
USE department_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(30) NOT NULL
);