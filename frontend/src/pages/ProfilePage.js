import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const LocalUser = Cookies.get("user");

    useEffect(() => {
        if (!LocalUser) {
            navigate("/");
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/usersList');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-light">Registered Users' Records</h1>
            <table className="table table-bordered table-transparent">
                <thead className="thead-dark">
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
        </div>
    );
}

export default ProfilePage;
