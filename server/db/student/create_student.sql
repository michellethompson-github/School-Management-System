INSERT INTO students(name, grade, homephone, age, dob, gender, address) 
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;