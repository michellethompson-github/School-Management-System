INSERT INTO homeroom(teacher_id, student_id) 
VALUES ($1, $2) RETURNING *; 