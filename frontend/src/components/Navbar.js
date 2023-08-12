import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const LocalUser = Cookies.get("user");

    const LogOut = () => {
        Cookies.remove('jwt');
        Cookies.remove("user");
        navigate("/");
    }

    return (
        <div>
            {LocalUser ? (
                <div className="bg-light rounded-bottom p-2 d-flex align-items-center justify-content-center">
                    <ul className="d-flex justify-content-between align-items-center list-unstyled m-0 p-0 gap-2 w-100">
                        <li className="d-flex align-items-center justify-content-center flex-grow-1">
                            <h3 className="m-0">Welcome {JSON.parse(LocalUser).name}</h3>
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
