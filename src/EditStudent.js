import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
function EditStudent(props) {

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

      const query = new URLSearchParams(useLocation().search);
      const id = query.get("id");
      
      const [teacher, setTeacher] = useState([])
  
      const [error, setError] = useState("")

      
      useEffect(() => {
        console.log('UseEffect Called!');
         
        axios.get(`http://localhost:5000/edit-student/${id}`)
        .then((res) => {
              console.log(res.data.data[0].firstname);
            setStudent(student => ({...student, 
              name: res.data.data[0].name,
              grade: res.data.data[0].grade,
              homephone: res.data.data[0].homephone,
              age: res.data.data[0].age,
              dob: res.data.data[0].dob,
              gender: res.data.data[0].gender,
              address: res.data.data[0].address
            }))
              
              console.log(`Success: ${res.data.success}`);
              console.log(student);
            if(res.data.success){
              console.log(res.data.success);
       
            }
        })
        .catch(err => {
            console.log(err);
        })
        
    }, [])

        
      function clickHandler(){
        console.log(`ID is : ${id}`);
        
       if(student.name === '' || student.grade === ''  || student.homephone === '' || student.age === '' || student.dob === '' || student.gender === '')
        {
          setError("One of the Fields is Missing")
        }

        else {
          setError("")
         
          
          axios.post(`http://localhost:5000/update-student/${id}`, student)
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
 <h1 className="heading">EDIT STUDENT</h1>
      {
        error && <h3 className='error-msg'>{error}</h3>
      }
     <div className="container">
      <div className="form-control">
      <label>ENTER NAME</label>
      <input type="text" value={student.name} onChange={(e) => setStudent({...student, name: e.target.value})} className="styled-input"/>
      
      </div>

      <div className="form-control">
      <label>ENTER GRADE</label>
      <input type="text" value={student.grade} onChange={(e) => setStudent({...student, grade: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER HOME PHONE</label>
      <input type="text" value={student.homephone} onChange={(e) => setStudent({...student, homephone: e.target.value})}  className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER AGE</label>
      <input type="text" value={student.age} onChange={(e) => setStudent({...student, age: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER DOB</label>
      <input type="text" value={student.dob} onChange={(e) => setStudent({...student, dob: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER GENDER</label>
      <input type="text" value={student.gender} onChange={(e) => setStudent({...student, gender: e.target.value})} className="styled-input"/>
      </div>
    </div>
      <button className="login" type="submit" onClick={() => clickHandler()}>UPDATE</button>    
    </div>
    
    )
}

export default EditStudent
