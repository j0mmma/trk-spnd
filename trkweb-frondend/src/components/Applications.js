import React from 'react';
import '../App.css';
import { mockApps } from './mockData';
import { useNavigate } from 'react-router-dom';

const Applications = () => {
    const navigate = useNavigate();

    return (
        <div className="main">
            <div className="header">
                <h1>Applications</h1>
                <button className="filters active">+ Add Application</button>
            </div>
            <div className="apps-list">
                {mockApps.map(app => (
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
        </div>
    );
};

export default Applications;
