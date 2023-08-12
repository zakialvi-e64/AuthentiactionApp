import React, { useEffect } from 'react';
import Error from '../images/NoPage.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NoPage = () => {
    const navigate = useNavigate();
    const LocalUser = Cookies.get("user");

    useEffect(() => {
        if (LocalUser) {
            navigate("/profile");
        }
    }, []);

    return (
        <div className="text-center">
            <br />
            <br />
            <h1 className="mb-2 mb-sm-5" style={{ color: "white", fontWeight: "bolder", fontSize: "50px" }}>
                Page Not Found
            </h1>
            <br />
            <br />
            <img src={Error} alt="error" />
        </div>
    );
};

export default NoPage;
