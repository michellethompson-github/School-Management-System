
require("dotenv").config({path: "./../.env"})


const express = require('express')  


const massive = require('massive')

var {DATABASE_URL, SESSION_SECRET} = process.env


massive({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
},
{
    scripts: './db'
}).then(db => {
    app.set("db", db);
    console.log('Database Connected Successfully!');
})


const session = require('express-session')  
const app = express()


const port = 5000
const cors = require('cors')        
app.use(cors())


app.use(express.json())


app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUnitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))


const userController = require('./controllers/UserController')
const studentController = require('./controllers/StudentsController')


app.post("/auth/register", userController.register)
app.post("/auth/login", userController.login)
app.get("/auth/logout", userController.logout)
app.get("/dashboard", userController.dashboard)
app.get("/students-list", studentController.studentsList)
app.post("/add-student", studentController.addStudent)
app.get("/edit-student/:id", studentController.editStudent)
app.post("/update-student/:id", studentController.updateStudent)
app.get("/delete-student/:id", studentController.deleteStudent)
app.get("/teachers-list", studentController.teachersList)

app.listen(port, () => {
    console.log(`Server Running, listening to Port ${port}`)
})

