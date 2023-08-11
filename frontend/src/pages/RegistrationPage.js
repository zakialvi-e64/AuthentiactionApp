import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import mainImage from '../images/MainImage.png';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Toast Functions
    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    // Email and Password Regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Checking email and password
        if (!emailRegex.test(email)) {
            notifyError('Invalid Email');
            return;
        } else if (!passwordRegex.test(password)) {
            notifyError(
                'Password must contain at least eight characters, including at least one number and includes both lower and upper case letters and special characters for example #,?,!'
            );
            return;
        }

        // Sending Data To Server
        axios
            .post(
                '/register',
                {
                    name: name,
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
                    notifySuccess(data.message);
                    navigate('/');
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
                    <img
                        style={{ borderRadius: '250px' }}
                        src={mainImage}
                        alt="MainImage"
                    />
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
                    <h2>Sign Up Here</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            name="name"
                            placeholder="Name"
                            onChange={(e) => {
                                setName(e.target.value);
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
                            Sign Up
                        </button>
                    </form>
                    <br />
                    <hr style={{ border: '1px solid gray', width: '350px' }} />
                    <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>
                        Already have an account?{' '}
                        <Link to="/">
                            <span
                                style={{ fontWeight: 'bold', color: 'blue' }}
                            >
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
