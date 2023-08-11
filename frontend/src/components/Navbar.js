import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  
const navigate = useNavigate();
const LocalUser = Cookies.get("user");

const LogOut = () =>{
  
    Cookies.remove('jwt')
    Cookies.remove("user");
    
   navigate("/");
    
  
}


  return (
    <>
      {LocalUser?(
      <>
          <button onClick={LogOut}
          style={{
            cursor: "pointer",
            fontWeight: "bolder",
            padding: "13px 25px",
            fontSize: "1rem",
            border: "none",
            color: "white",
            background:"#db183c",
            borderRadius: "15px",
            marginLeft: "20px",
            transition: "all 0.25s ease",
          }}>Logout</button>
          
      </>):(
      <>
      <h1>Authentication App</h1>
      </>)}
    </>
  )
}

export default Navbar