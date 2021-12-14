import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { loginUser, logoutUser } from './redux/actions';
import axios from 'axios'



function Dashboard(props) {
    const [user, setUser] = useState()
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        console.log(`State: ${props.loggedIn}`);
        axios.get('http://localhost:5000/dashboard')
        .then(res => {
            console.log(`Received Response ; ${res.data.message}`);
        })
        .catch(err => {
            console.log(`Request failed with ${err}`);
        })
    }, [])
    return (
        <div>
            <h1>This is the Dashboard</h1>
        </div>
    )
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
    mapDispatchToProps)(Dashboard);
  