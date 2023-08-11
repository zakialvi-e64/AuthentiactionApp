import React from 'react';
import Error from "../images/no_page.png";

const NoPage = () => {
  return (
    <div>
        <h1 className="text-center mb-2 mb-sm-5" style={{color:"white", fontWeight:"bolder", fontSize:"50px"}}>Page Not Found</h1>
        <br/>
        
        <br/>   
        <img src={Error} alt="My Image"/>
    </div>
  )
}

export default NoPage