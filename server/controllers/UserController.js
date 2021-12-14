const bcrypt = require("bcryptjs");
const nodemailer = require ('nodemailer')

module.exports = {
    register: async (req, res) => {
        console.log('Inside Register');
            try {
                console.log('Inside Try');
                
                const db = await req.app.get("db")

                db.teachers.find({
                    email: req.body.email
                }).then(user => {
                    if(user.length > 0){
                        res.status(200).send({error: "User with this Email Already Exist"})
                    }
                    else {
                        
                        let salt = bcrypt.genSaltSync(10);
                        let hash = bcrypt.hashSync(req.body.password, salt)
                    
                        
                        db.teacher.create_teacher(req.body.firstName, req.body.lastName, req.body.email, hash)
                        .then(user => {
                            
                            req.session.user = user[0]
                            let mailTransporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'schoolmanagementsystem77@gmail.com',
                                    pass: 'School123!@#'
                                }
                            });
                              
                            let mailDetails = {
                                from: 'support@schoolmanagement.com',
                                to: user[0].email,
                                subject: 'Registration Successful!',
                                text: 'Thanks for Registering. Your account has been created successfully!'
                            };
                              
                            mailTransporter.sendMail(mailDetails, function(err, data) {
                                if(err) {
                                    console.log('Error Occurs');
                                } else {
                                    console.log('Email sent successfully');
                                }
                            });
                            
                            res.status(200).send({data: user[0], success: "User Created Successfully!"})
                        })
                    }
                })
            }
            catch(err){
                console.log(err);
            }
  //      
    },
    login: async (req, res) => {
        try {
            const db = await req.app.get("db")
            db.teachers.find({
                email: req.body.email
            })
            .then(user => {
                
                if(user.length > 0){ 
                    let check = bcrypt.compareSync(req.body.password, user[0].password)
                    if(!check){ 
                        res.status(200).send({error: "Email or Password Incorrect"})
                    }
                    else { 
                        req.session.user = user[0]
                        res.status(200).send({data: user[0], success: "Login Successful"})
                    }
                }
                else { 
                    res.status(200).send({error: "User does Not Exist"})
                }
            })
        }
        catch(err){
            console.log(err);
        }
        
    },
    logout: async (req, res) => {
        try {
            if(req.session.user){   
                console.log('User Logged Out');
                res.status(200).send({success: "User Logged Out Successfully!"})

            }
            else {
                console.log('User is not logged in');
                res.status(200).send({error: "User is not Logged In"})
            }
        }
        catch(err){
            res.status(403).send({error: "Something went wrong"})
        }

    },
    dashboard: async (req, res) => {
        res.status(200).send({message: "Dashboard Connected"})
    }

}