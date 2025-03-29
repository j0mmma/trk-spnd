import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from './mockData';
import '../App.css';

const UserDetails = () => {
    const { id } = useParams();
    const user = mockUsers.find(u => u.id === Number(id));

    if (!user) return <div className="main">User not found.</div>;

    return (
        <div className="main app-details">
            <h2>{user.fname} {user.lname}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
        </div>
    );
};

export default UserDetails;
