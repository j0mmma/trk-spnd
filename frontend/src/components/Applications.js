import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Applications = () => {
    const [apps, setApps] = useState([]);
    const [usersMap, setUsersMap] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        status: 'Active',
        renewal_date: '',
        owner_id: '',
        notes: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await fetch(`${process.env.PUBLIC_URL}/mock_spndb.json`);
                const data = await res.json();

                const userMap = {};
                data.users.forEach(u => {
                    userMap[u.id] = `${u.fname} ${u.lname}`;
                });

                const appsWithOwnerNames = data.apps.map(app => ({
                    ...app,
                    owner: userMap[app.owner_id] || 'Unknown'
                }));

                setApps(appsWithOwnerNames);
                setUsersMap(userMap);
            } catch (err) {
                console.error('Failed to fetch app data:', err);
            }
        };

        fetchApps();
    }, []);

    const handleSubmit = () => {
        const newApp = {
            ...formData,
            id: apps.length + 1,
            owner: usersMap[formData.owner_id] || 'Unknown'
        };

        setApps(prev => [...prev, newApp]);
        setFormData({
            name: '',
            category: '',
            status: 'Active',
            renewal_date: '',
            owner_id: '',
            notes: ''
        });
        setShowModal(false);
    };

    return (
        <div className="main">
            <div className="header">
                <h1>Applications</h1>
                <button className="filters active" onClick={() => setShowModal(true)}>
                    + Add Application
                </button>
            </div>

            <div className="apps-list">
                <div className="app-card app-card-header">
                    <div><strong>Name</strong></div>
                    <div><strong>Category</strong></div>
                    <div><strong>Status</strong></div>
                    <div><strong>Renewal Date</strong></div>
                    <div><strong>Owner</strong></div>
                    <div><strong>Notes</strong></div>
                </div>

                {apps.map(app => (
                    <div
                        key={app.id}
                        className="app-card"
                        onClick={() => navigate(`/applications/${app.id}`)}
                    >
                        <div className="left">
                            <span><strong>{app.name}</strong></span>
                        </div>
                        <div>{app.category}</div>
                        <div>
                            <span className={`status-label ${app.status.toLowerCase().replace(/\s/g, '-')}`}>
                                {app.status}
                            </span>
                        </div>
                        <div>{app.renewal_date}</div>
                        <div>{app.owner}</div>
                        <div>{app.notes}</div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Add New Application</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Needs Review">Needs Review</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <input
                            type="date"
                            value={formData.renewal_date}
                            onChange={e => setFormData({ ...formData, renewal_date: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Owner ID"
                            value={formData.owner_id}
                            onChange={e => setFormData({ ...formData, owner_id: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Notes"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        />
                        <div className="modal-actions">
                            <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;
