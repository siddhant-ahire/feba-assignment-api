CREATE DATABASE feba-assignment;

create table users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    dob DATE
);
