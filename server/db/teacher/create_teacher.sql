INSERT INTO teachers(firstname, lastname, email, password) 
VALUES ($1, $2, $3, $4) RETURNING *;