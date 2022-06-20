import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home=()=>{

  const [users, setUsers] = useState('');

  useEffect(() => {
    loadUsers();
  },[]);

  const loadUsers = async () => {
  const result = await axios.get("http://localhost:3200/users");
    console.log(result);
     setUsers(result.data);
  };

  const deleteUser = async (user) => {
    const result = await axios.delete(`http://localhost:3200/users/${user.id}`);
      console.log(result);
      //  setUsers(result.data);
      loadUsers();
    };
 

 return(
    <div className="container">
      <div className="py-4">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h3>Home Page</h3>
          <button className="btn btn-primary">
             <Link style={{color: 'white'}} to="/AddEmployee">Add Employee</Link>
          </button>
        </div>
        <table className="table border shadow">
        <thead className="thead-dark">
        <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
     { users && users.map((user, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
          <button className="btn btn-primary mr-4"><Link style={{color: 'white'}} to={`/editemployee/${user.id}`}>Edit Employee</Link></button>
          <button className="btn btn-danger " onClick={() => deleteUser(user)}>Delete</button>
       </td>
    </tr>
     ))}
       
      
   </tbody>
   </table>
      </div>
    </div>  
 );
};

export default Home;
