import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const TableStyle = styled.table`
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse; 
`;

const Title = styled.h1`
    text-align:center;
`;

const THeading = styled.thead`
    font-size:18px;
`;

const TBody = styled.tbody`
    font-size:18px;
`;

const THead = styled.th`
    border: 1px solid black;
    border-collapse: collapse; 
    color:white;
    background:black;
`;

const TData = styled.td`
    border: 1px solid black;
    border-collapse: collapse; 
`;

const DeleteButton = styled.button`
    border: 1px solid black;
    color:white;
    background:black;
    padding: 6px 8px;
`;

const EditButton = styled.button`
    border: 1px solid green;
    color:white;
    background:green;
    padding: 6px 8px;
`;



function StudentsList() {

    const navigate = useNavigate()

    const [student, setStudent] = useState([])

    useEffect(() => {
        console.log('Use Effect Called');
      axios.get('http://localhost:5000/students-list')
      .then(res => {
          console.log('Response:');
          console.log(res.data.data);
          console.log(res.data.success);
          setStudent(res.data.data)

      })
      .catch(err => {
          console.log(err);
      })
      
    }, [])

    function editHandler(data){
        console.log(data);
        navigate(`/edit-student?id=${data}`)
    }

    function deleteHandler(data){
        console.log(`ID : ${data}`);
        axios.get(`http://localhost:5000/delete-student/${data}`)
        .then(res => {
            console.log(res.data.success);
            console.log(res.data);
            setStudent(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    


    return (
        <div>
            <Title>Students List</Title>
            <div className="table-styling">
            <TableStyle>
                <THeading>
                    <THead>Name</THead>
                    <THead>Grade</THead>
                    <THead>Home Phone</THead>
                    <THead>Age</THead>
                    <THead>Date of Birth</THead>
                    <THead>Gender</THead>
                    <THead>Address</THead>
                    <THead>Added By</THead>
                    <THead>Actions</THead>
               
                </THeading>
                <TBody>
                    {
                        student.map(item => {
                            return (
                                <tr key={item.st_id}>
                                    <TData>{item.st_name}</TData>
                                    <TData>{item.st_grade}</TData>
                                    <TData>{item.st_homephone}</TData>
                                    <TData>{item.st_age}</TData>
                                    <TData>{item.st_dob}</TData>
                                    <TData>{item.st_gender}</TData>
                                    <TData>{item.st_address}</TData>
                                    <TData>{item.t_fname} {item.t_lname}</TData>
                                    <TData><EditButton onClick={() => editHandler(item.st_id)}>Edit</EditButton> <DeleteButton onClick={() => deleteHandler(item.st_id)}>Delete</DeleteButton> </TData>
                                </tr>
                            )
                        })
                    }
                </TBody>
            </TableStyle>
            </div>
        </div>
    )
}

export default StudentsList
