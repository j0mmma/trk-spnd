import React, { useEffect, useState } from 'react';
import '../App.css';

const Analytics = () => {
    const [apps, setApps] = useState([]);
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.PUBLIC_URL}/mock_spndb.json`);
                const data = await res.json();

                setApps(data.apps);
                setUsers(data.users);
                setTransactions(data.transactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate upcoming renewals (within the next 30 days, for example)
    const today = new Date();
    const upcomingRenewals = apps
        .filter(app => new Date(app.renewal_date) > today)
        .sort((a, b) => new Date(a.renewal_date) - new Date(b.renewal_date))
        .slice(0, 5); // Limit to top 5 renewals

    // Get total users and applications
    const totalUsers = users.length;
    const totalApps = apps.length;

    // Forecasted expenses
    const forecastedExpenses = apps.reduce((sum, app) => {
        const multiplier = app.pricing_plan.billing_cycle.toLowerCase() === 'monthly' ? 12 : 1;
        return sum + (app.pricing_plan.price_per_licence * app.pricing_plan.num_of_licences * multiplier);
    }, 0);

    // Actual expenses (from transactions in the last year)
    const actualExpenses = transactions
        .filter(tx => new Date(tx.datetime) > new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
        .reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="main">
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            {/* Total Applications and Users */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-title">Total Applications</div>
                    <div className="stat-value">{totalApps}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{totalUsers}</div>
                </div>
            </div>

            {/* Total Expenses Section */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-title">Annual Forecasted Spend</div>
                    <div className="stat-value">${forecastedExpenses.toFixed(2)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Annual Actual Spend</div>
                    <div className="stat-value">${actualExpenses.toFixed(2)}</div>
                </div>
            </div>

            {/* Upcoming Renewals */}
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
