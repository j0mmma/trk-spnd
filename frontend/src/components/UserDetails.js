import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userApps, setUserApps] = useState([]);

    useEffect(() => {
        const userId = Number(id);

        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.PUBLIC_URL}/mock_spndb.json`);
                const data = await res.json();

                console.log('Loaded JSON data:', data);

                const foundUser = data.users.find(u => u.id === userId);
                console.log('Selected user:', foundUser);
                setUser(foundUser);

                const userAssignments = data.app_assignments.filter(a => a.user_id === userId);
                const assignedAppIds = userAssignments.map(a => a.app_id);
                console.log('Assigned app IDs:', assignedAppIds);

                const apps = data.apps.filter(app => assignedAppIds.includes(app.id));
                console.log('Assigned apps:', apps);

                // Attach owner name for each app
                const appsWithOwner = apps.map(app => {
                    const owner = data.users.find(u => u.id === app.owner_id);
                    return { ...app, owner: owner ? `${owner.fname} ${owner.lname}` : 'Unknown' };
                });

                setUserApps(appsWithOwner);
            } catch (err) {
                console.error('Failed to load mock data:', err);
            }
        };

        fetchData();
    }, [id]);

    if (!user) return <div className="main">User not found.</div>;

    return (
        <div className="main app-details">
            <h2>{user.fname} {user.lname}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>

            <h3 style={{ marginTop: '24px' }}>Apps assigned to this user:</h3>

            {userApps.length === 0 ? (
                <p>No apps assigned.</p>
            ) : (
                <div className="apps-list">
                    {/* Header Row */}
                    <div className="app-card app-card-header">
                        <div><strong>Name</strong></div>
                        <div><strong>Category</strong></div>
                        <div><strong>Status</strong></div>
                        <div><strong>Renewal</strong></div>
                        <div><strong>Owner</strong></div>
                        <div><strong>Notes</strong></div>
                    </div>

                    {/* App Cards */}
                    {userApps.map(app => (
                        <div
                            key={app.id}
                            className="app-card"
                            onClick={() => navigate(`/applications/${app.id}`)}
                        >
                            <div className="left">
                                <span>{app.name}</span>
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
            )}
        </div>
    );
};

export default UserDetails;
