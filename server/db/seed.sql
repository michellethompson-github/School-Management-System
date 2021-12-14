CREATE TABLE teachers(
    id serial PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE students (
    id serial PRIMARY KEY, 
    name VARCHAR NOT NULL,
    grade VARCHAR,
    homephone VARCHAR,
    age VARCHAR,
    dob VARCHAR,
    gender VARCHAR,
    address VARCHAR
);


CREATE TABLE homeroom (
    id serial PRIMARY KEY,
    teacher_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL
)