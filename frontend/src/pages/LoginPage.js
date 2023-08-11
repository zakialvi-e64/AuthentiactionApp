import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import mainImage from '../images/MainImage.png';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //Email and Password Regex
  const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
    // Toast Functions
    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Checking email and password
        if (!emailRegex.test(email)) {
            notifyError('Invalid Email');
            return;
        }

        // Sending Data To Server
        axios
            .post(
                '/login',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    notifyError(data.error);
                } else {
                    notifySuccess('Signed In Successfully');
                    Cookies.set('jwt', data.token);
                    Cookies.set('user', JSON.stringify(data.user));
                    navigate('/profile');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div
            style={{
                height: '575px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className="homie"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '1000px',
                    alignItems: 'flex-start',
                    gap: '100px',
                }}
            >
                <div
                    style={{
                        width: '500px',
                        height: '500px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img src={mainImage} alt="MainImage" />
                </div>

                <div
                    style={{
                        width: '500px',
                        height: '500px',
                        color: 'black',
                        backgroundColor: '#E7E7E7',
                        textAlign: 'center',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h2>Sign In To Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            style={{
                                width: '300px',
                                height: '40px',
                                borderRadius: '10px',
                                fontSize: '20px',
                            }}
                        />
                        <br />
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            style={{
                                width: '300px',
                                height: '40px',
                                borderRadius: '10px',
                                fontSize: '20px',
                            }}
                        />
                        <br />
                        <button
                            type="submit"
                            style={{
                                cursor: 'pointer',
                                width: '300px',
                                height: '45px',
                                borderRadius: '10px',
                                background: '#187DEC',
                                color: 'white',
                                fontWeight: 'bolder',
                                fontSize: '20px',
                            }}
                        >
                            Sign In
                        </button>
                    </form>
                    <br />
                    <hr style={{ border: '1px solid gray', width: '350px' }} />
                    <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>
                        Don't have an account?{' '}
                        <Link to="/register">
                            <span style={{ fontWeight: 'bold', color: 'blue' }}>
                                Sign Up
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
