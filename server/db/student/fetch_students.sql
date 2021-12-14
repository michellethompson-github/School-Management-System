SELECT students.id as st_id,
students.name as st_name,
students.grade as st_grade,
students.homephone as st_homephone,
students.age as st_age,
students.dob as st_dob,
students.gender as st_gender,
students.address as st_address,
teachers.firstname as t_fname, 
teachers.lastname as t_lname FROM students
INNER JOIN homeroom
ON homeroom.student_id = students.id
INNER JOIN teachers
ON homeroom.teacher_id = teachers.id;