
SELECT 
students.id as st_id,
students.firstname as st_fname, 
students.lastname as st_lname, 
students.fathername as st_fathername, 
students.age as st_age, 
students.grade as st_grade, 
students.city as st_city, 
teachers.firstname as t_fname,
teachers.lastname as t_lname,
teachers.email as t_email FROM students
INNER JOIN teachers ON students.teacher_id = teachers.id;