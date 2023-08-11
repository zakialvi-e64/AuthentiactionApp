import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/usersList');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigate = useNavigate();
  const LocalUser = Cookies.get("user"); 

  

  return (
  <>
    <div>
      <h1>Welcome {JSON.parse(LocalUser).name}</h1>
    </div>

    <div>
        <center>
          <h3>User Records</h3>
          <table border={1}>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Email</th>
                
                
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>

  </>
    
  )
}

export default ProfilePage