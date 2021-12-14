import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import {connect} from 'react-redux'
import { loginUser, logoutUser } from './redux/actions';
import axios from 'axios'
import './App.scss';
import styled from 'styled-components';

//CSS in JS
const RegisterText = styled.a`
text-decoration: none;
color: #000;
font-weight: bold;
`;



function Signin(props) {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: "",
    error: ""
  })

  useEffect( () => {
    console.log(`Inside UseEffect, data is ${props.loggedIn}`);
  }, [props])

  function clickHandler(){
    if(user.email === '' || user.password === ''){
      setUser({...user, error: "Email/Password cannot be empty"})
    }
  
    axios.post('http://localhost:5000/auth/login', user)
    .then(res => {
      console.log(res.data)
      if(res.data.success){
        console.log(`Redux State Value: ${props.loggedIn}`);
        //Using Redux To Change the state
        props.loginUser()
        navigate('/dashboard')


      }
      if(res.data.error){
        setUser({...user, error: res.data.error})
      }
    })
    .catch(err => {
      console.log(err)
    
    })
  
  }



  return (
    <div>
      <h2 className="bottom-spacing">SIGN IN</h2>
      {
        user.error && <h3 className='error-msg'>{user.error}</h3>
      }
      <div className="form-control">
      <label className="first-label">ENTER EMAIL</label>
      <input type="text" onChange={(e) => setUser({...user, email:e.target.value })} className="styled-input"/>
      </div>
      <div className="form-control">
      <label className="password">ENTER PASSWORD</label>
      <input type="password" onChange={(e) => setUser({...user, password:e.target.value })} className="styled-input"/>
      </div>
      
      <button className="login" type="submit" onClick={() => clickHandler()}>SIGN IN</button>
      <div className="account-text">Don't already have an account? <RegisterText className ="register" href="register">Register here!</RegisterText></div>
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
  mapDispatchToProps)(Signin);
