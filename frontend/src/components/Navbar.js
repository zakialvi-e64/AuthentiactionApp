import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, , removeCookies] = useCookies(['user']);
    const user = cookies.user;


    

    const LogOut = () => {
        axios.get('/logout');
        removeCookies('user');
        navigate('/');
        
        
    }

    return (
        <div>
            {user ? (
                <div className="bg-light rounded-bottom p-2 d-flex align-items-center justify-content-center">
                    <ul className="d-flex justify-content-between align-items-center list-unstyled m-0 p-0 gap-2 w-100">
                        <li className="d-flex align-items-center justify-content-center flex-grow-1">
                            <h3 className="m-0">Welcome {user.name}</h3>
                        </li>
                        <li className="ml-auto">
                            <button
                                onClick={LogOut}
                                className="btn btn-danger"
                                style={{ fontWeight: 'bolder', fontSize: '1rem', borderRadius: '15px', transition: 'all 0.25s ease' }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Navbar;
