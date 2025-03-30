import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const roleOptions = ['Admin', 'Member'];
const statusOptions = ['Active', 'Inactive'];

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ fname: '', lname: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/users');
                const data = await res.json();
                console.log('Fetched users from backend:', data);
                setUsers(data);
            } catch (err) {
                console.error('Failed to fetch users from backend:', err);
            }
        };
        fetchUsers();
    }, []);

    const updateUserField = async (id, field, value) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ field, value }),
            });

            if (res.ok) {
                setUsers(prev =>
                    prev.map(user =>
                        user.id === id ? { ...user, [field]: value } : user
                    )
                );
            }
        } catch (err) {
            console.error('Failed to update user:', err);
        }
    };

    const handleInvite = () => {
        const newUser = {
            id: users.length + 1,
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            department: users[0]?.department || 'Unknown',
            role: 'Member',
            status: 'Active',
        };

        setUsers(prev => [...prev, newUser]);
        setFormData({ fname: '', lname: '', email: '' });
    };

    return (
        <div className="main">
            <div className="header">
                <h1>Users</h1>
            </div>

            <div className="invite-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={e => setFormData({ ...formData, fname: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={e => setFormData({ ...formData, lname: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="invite-form-button">
                <button onClick={handleInvite}>Submit</button>
            </div>

            <div className="apps-list">
                <div className="employee-card employee-card-header">
                    <div><strong>Name</strong></div>
                    <div><strong>Email</strong></div>
                    <div><strong>Department</strong></div>
                    <div><strong>Role</strong></div>
                    <div><strong>Status</strong></div>
                </div>

                {users.map(user => (
                    <div
                        key={user.id}
                        className="employee-card"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        <div className="left">
                            <span>{user.fname} {user.lname}</span>
                        </div>
                        <div>{user.email}</div>
                        <div>{user.department}</div>

                        <div onClick={e => e.stopPropagation()}>
                            <select
                                value={user.role}
                                onChange={e => updateUserField(user.id, 'role', e.target.value)}
                            >
                                {roleOptions.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <div onClick={e => e.stopPropagation()}>
                            <select
                                value={user.status}
                                onChange={e => updateUserField(user.id, 'status', e.target.value)}
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
