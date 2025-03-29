import React from 'react';
import '../App.css';
import { mockApps, mockUsers } from './mockData';

const Analytics = () => {
    // Get upcoming renewals (next 30 days, for example)
    const today = new Date();
    const upcomingRenewals = mockApps
        .filter(app => new Date(app.renewal_date) > today)
        .sort((a, b) => new Date(a.renewal_date) - new Date(b.renewal_date))
        .slice(0, 5); // Limit to top 5

    return (
        <div className="main">
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-title">Total Applications</div>
                    <div className="stat-value">{mockApps.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{mockUsers.length}</div>
                </div>
            </div>

            <div className="section">
                <h2>Upcoming Renewals</h2>
                <div className="apps-list">
                    {upcomingRenewals.map(app => (
                        <div key={app.id} className="app-card">
                            <div className="left">
                                <span>{app.name}</span>
                            </div>
                            <div>{app.renewal_date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
