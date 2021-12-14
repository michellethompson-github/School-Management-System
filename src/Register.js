import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux'
import { loginUser, logoutUser } from './redux/actions';
import { Link, useLinkClickHandler } from 'react-router-dom';
import './App.scss';

function Register(props) {

  const navigate = useNavigate()

    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    })

    const [error, setError] = useState("")
 
      
    function clickHandler(){
      console.log(user.firstName);
     if(user.firstName == '' || user.lastName == ''  || user.email == '' || user.password == '' || user.cpassword == '')
      {
        setError("One of the Fields is Missing")
      }
      else {
        setError("")
        
      axios.post('http://localhost:5000/auth/register', user)
      .then(res => {
        console.log(`Received Response: ${JSON.stringify(res.data)}`)
        if(res.data.success){
          props.loginUser()
          navigate('/dashboard')
        }
      })
      .catch(err => {
        console.log(err)
      
      })
    }
    }

  return (
    <div>
      <h1 className="heading">SIGN UP</h1>
      {
        error && <h3 className='error-msg'>{error}</h3>
      }
     <div className="container">
      <div className="form-control">
      <label>ENTER FIRST NAME</label>
      <input type="text" onChange={(e) => setUser({...user, firstName: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER LAST NAME</label>
      <input type="text" onChange={(e) => setUser({...user, lastName: e.target.value})} className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER EMAIL</label>
      <input type="email" onChange={(e) => setUser({...user, email: e.target.value})}  className="styled-input"/>
      </div>

      <div className="form-control">
      <label>ENTER PASSWORD</label>
      <input type="password" onChange={(e) => setUser({...user, password: e.target.value})} className="styled-input" />
      </div>

      <div className="form-control">
      <label>CONFIRM PASSWORD</label>
      <input type="password" onChange={(e) => setUser({...user, cpassword: e.target.value})} className="styled-input"/>
      </div>
    </div>
      <button className="login" type="submit" onClick={() => clickHandler()}>REGISTER</button>
      <div className="account">Already have an account? <Link to = "/login">Sign in here!</Link></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Register);