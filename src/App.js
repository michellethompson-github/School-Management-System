import {Provider} from 'react-redux'
import store from './redux/store'
import React from 'react';
import './App.scss';
import Nav from './Nav';
import Signin from './Signin';
import Register from './Register';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StudentsList from './StudentsList';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';


function App() {
  return (
    <Provider store={store}>
      <Router>
            <Nav />
            <div className="company-name">SCHOOL MANAGEMENT SYSTEM</div>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students-list" element={<StudentsList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student" element={<EditStudent />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
