import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import mainImage from '../images/MainImage.png';
import Cookies from 'js-cookie';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LocalUser = Cookies.get('user');

    useEffect(() => {
        if (LocalUser) {
            navigate('/profile');
        }
    }, []);

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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '575px' }}>
            <div className="homie d-flex justify-content-space-between w-100" style={{ gap: '100px', maxWidth: '1000px' }}>
                <div className="text-center bg-light p-4 rounded" style={{ width: '500px', height: '500px', order: 2 }}>
                    <h2>Register Here</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            name="name"
                            placeholder="Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="form-control mb-3"
                        />
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="form-control mb-3"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mb-3"
                        >
                            Register
                        </button>
                    </form>
                    <hr className="my-4" />
                    <p className="font-weight-bold">
                        Already have an account?{' '}
                        <Link to="/" className="font-weight-bold text-primary">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="text-center" style={{ width: '500px', height: '500px', borderRadius: '20px', order: 1 }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <img className="rounded-circle" src={mainImage} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
