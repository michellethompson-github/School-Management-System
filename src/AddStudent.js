import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
function AddStudent() {

    const navigate = useNavigate()
    const [student, setStudent] = useState({
        name: "",
        grade: "",
        homephone: "",
        age: "",
        dob: "",
        gender: "",
        address: "",
        teacher: ""
      })

      const [teacher, setTeacher] = useState([])
  
      const [error, setError] = useState("")

      
      useEffect(() => {
          console.log('Use Effect Called');
        axios.get('http://localhost:5000/teachers-list')
        .then((res) => {
            
            if(res.data.success){
                setTeacher(res.data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })
        
    }, [])

        
      function clickHandler(){

        
       if(student.name === '' || student.grade === ''  || student.homephone === '' || student.age === '' || student.dob === '' || student.gender === '' || student.address === '')
        {
          setError("One of the Fields is Missing")
        }

        else {
          setError("")
          
        axios.post('http://localhost:5000/add-student', student)
        .then(res => {
            console.log(res.data);
          if(res.data.success){
            console.log(res.data.success);
            navigate('/students-list')
     
          }
        })
        .catch(err => {
          console.log(err)
        
        })
      }
      
      }

    return (
        <div>
 <h1 className="heading">ADD STUDENTS</h1>
      {
        error && <h3 className='error-msg'>{error}</h3>
      }
     <div className="container">
      <div className="form-control">
      <label>ENTER NAME</label>
      <input type="text" onChange={(e) => setStudent({...student, name: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER GRADE</label>
      <input type="text" onChange={(e) => setStudent({...student, grade: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER HOMEPHONE</label>
      <input type="text" onChange={(e) => setStudent({...student, homephone: e.target.value})}  className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER AGE</label>
      <input type="text" onChange={(e) => setStudent({...student, age: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER DOB</label>
      <input type="text" onChange={(e) => setStudent({...student, dob: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER GENDER</label>
      <input type="text" onChange={(e) => setStudent({...student, gender: e.target.value})} className="styled-input"/>
      </div>
      <div className="form-control">
      <label>ENTER ADDRESS</label>
      <input type="text" onChange={(e) => setStudent({...student, address: e.target.value})} className="styled-input"/>
      </div>
      
      <div className="form-control">
          <label>SELECT TEACHER</label>
          <select className="styled-input" onChange={(e) => setStudent({...student, teacher: e.target.value})}>
              <option>Select Teacher</option>
            {
                teacher.map(item => {
                    return <option key={item.id} value={item.id}>{item.firstname} {item.lastname}</option>
                })
            }
          </select>
      </div>
    </div>
      <button className="login" type="submit" onClick={() => clickHandler()}>REGISTER</button>    
    </div>
    
    )
}

export default AddStudent
