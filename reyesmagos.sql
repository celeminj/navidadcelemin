CREATE DATABASE ReyesMagos;
USE ReyesMagos;

CREATE TABLE cartas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    url VARCHAR(255) DEFAULT NULL
);
