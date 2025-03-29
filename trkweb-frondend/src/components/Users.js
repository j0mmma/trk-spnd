import React from 'react';
import '../App.css';
import { mockUsers } from './mockData';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();

    return (
        <div className="main">
            <div className="header">
                <h1>Users</h1>
                <button className="filters active">+ Invite User</button>
            </div>
            <div className="apps-list">
                {mockUsers.map(user => (
                    <div
                        key={user.id}
                        className="app-card employee-card"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        <div className="left">
                            <span>{user.fname} {user.lname}</span>
                        </div>
                        <div>{user.email}</div>
                        <div>{user.department}</div>
                        <div>{user.role}</div>
                        <div>{user.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
