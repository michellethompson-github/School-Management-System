import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { loginUser, logoutUser } from './redux/actions';
import './App.scss';

import styled from 'styled-components';

//CSS in JS
const Navbar = styled.nav`
background: #e52526;
color: white;
align-items: center;
display: flex;
justify-content: right;
min-height: 10vh;
`;

const NavLink = styled.ul`
list-style: none;
  margin: 0 15px;
`;

const Arrow = styled.img`
cursor: pointer;
margin: 5px 20px;
`;

function Nav(props) {

    const navigate = useNavigate()

  function logoutHandler(){
    axios.get('http://localhost:5000/auth/logout')
        .then(res => {
            console.log(res.data);
            console.log('Logged Out');
            props.logoutUser()
            navigate('/login')
        })
        .catch(err => {
            console.log(`Request failed with ${err.data}`);
        })
  }

  return (
    <Navbar>
      {/* <button className="register-button" type="register-button">Register</button> */}
        <div className = "right-menu">
        <Arrow className = "downward-arrow" src="images/vippng.com-downward-arrow-png-2108608.png" alt="downward-arrow" width="31.25" height="20.8125"></Arrow>
          
          {
          props.loggedIn === 1 ? 
          <div className = "dropdown">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/students-list">Students List</Link>
            <Link to="/add-student">Add Student</Link>
            <span onClick={() => logoutHandler()}><Link to="/auth/logout">Logout</Link></span>
          </div>
          :
          <div className="dropdown">
            <Link to="/register">Register</Link>
            <Link to="/login">SignIn</Link>
           </div> 
           } 
          
        </div>
    
      {
      props.loggedIn === 1 ? 
        <NavLink className= "nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/students-list">Students List</Link></li>
        <li><Link to="/add-student">Add Student</Link></li>
        <li onClick={() => logoutHandler()}><Link to="/logout">Logout</Link></li>
        </NavLink>
      :
         <NavLink className= "nav-links">
         <li><Link to="/login">SignIn</Link></li>
         <li><Link to="/register">Register</Link></li>
        </NavLink>
    }
      

    

       
        
    </Navbar>
  );
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Nav);