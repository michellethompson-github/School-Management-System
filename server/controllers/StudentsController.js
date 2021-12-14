module.exports = {
    studentsList: async (req, res) => {
        try {
            const db = await req.app.get('db')
            db.student.fetch_students()
            .then(data => {
                console.log(data);
                res.status(200).send({data:data, success: "Students List Fetched Successfully!"})
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                res.status(403).send({error: "Something went wrong"})
            })
        }
        catch(err){
            console.log(err);
            res.status(403).send({error: "Something went wrong!"})
        }
    },
    addStudent: async (req, res) => {
         
        try{
            
            const db = await req.app.get('db')
            //Create New Student
            db.student.create_student(
                req.body.name,
                req.body.grade,
                req.body.homephone,
                req.body.age,
                req.body.dob,
                req.body.gender,
                req.body.address,
                req.body.teacher
            )
            .then(result => {
                db.homeroom.create_homeroom(
                    req.body.teacher,
                    result[0].id
                )
                .then(result2 => {
                    res.status(200).send({data: result[0], roomdata: result2[0], success: "Student Added Successfully"})
                }).catch(err =>{
res.status(403).send({error: err})
                })
              
            })
            
        }
        catch(err){
            res.status(403).send({error: "Something went wrong!"})
        }
        
    },
    editStudent: async(req, res) => {
        try {
            const db = await req.app.get('db')
            db.student.fetch_specific_student(req.params.id)
            .then(data => {
                res.status(200).send({data:data, success: "Student data received successfully!"});
            })
            .catch(err => {
                res.status(403).send({error: err.message});
            })

        }
        catch(err){
            res.status(403).send({error: err.message});
        }
    },
    updateStudent: async(req, res) => {
        try {
            const db = await req.app.get('db')
            db.student.update_student(
                req.body.name,
                req.body.grade,
                req.body.homephone,
                req.body.age,
                req.body.dob,
                req.body.gender,
                req.body.address,
                req.params.id)
            .then(data => {
                res.status(200).send({success: "Student data Updated successfully!"});
            })
            .catch(err => {
                res.status(403).send({error: err.message});
            })
        }
        catch(err){
            res.status(403).send({error: err.message});
            
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const db = await req.app.get('db')
            
            db.student.delete_student(req.params.id)
            .then(data => {
                
                res.status(200).send({data: data, success: "Deletion Successful!"})
            })
            .catch(err=> {
                res.status(403).send({error:"Something went wrong!"})
            })
        }
        catch(err){

        }
    },
    teachersList: async (req, res) => {
        try {
            const db = await req.app.get('db')
            db.teacher.fetch_teachers()
            .then(data => {

                res.status(200).send({data:data, success: "Teachers List Fetched Successfully!"})
            })
            .catch(err => {

                res.status(403).send({error: "Something went wrong"})
            })
        }
        catch(err){
            res.status(403).send({error: "Something went wrong!"})
        }
    }
}