import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import mainImage from '../images/MainImage.png';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (cookies.user) {
            navigate('/profile');
        }
    }, [cookies.user]);

    // Email and Password Regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
        axios.post('/login',
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
                    notifyError("Invalid Password");
                } else {
                    notifySuccess('Signed In Successfully');
                    //setCookie('jwt', data.token);
                    //Cookies.set('token', data.token);
                    setCookie('user', JSON.stringify(data.user));

                    navigate('/profile');
                }

                
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '575px' }}>
            <div className="homie d-flex justify-content-space-between w-100" style={{ gap: '100px', maxWidth: '1000px' }}>
                <div className="text-center" style={{ width: '500px', height: '500px', borderRadius: '20px' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <img src={mainImage} alt="img" />
                    </div>
                </div>

                <div className="text-center bg-light p-4 rounded" style={{ width: '500px', height: '450px' }}>
                    <h2>Login To Your Account</h2>
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                    <hr className="my-4" />
                    <p className="font-weight-bold">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-weight-bold text-primary">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
