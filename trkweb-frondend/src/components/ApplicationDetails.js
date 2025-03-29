import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockApps, mockPricingPlans, mockTransactions } from './mockData';
import '../App.css';

const tabs = ['Overview', 'Pricing Plans', 'Users', 'Transactions'];

const ApplicationDetails = () => {
    const { id } = useParams();
    const app = mockApps.find(a => a.id === Number(id));
    const [activeTab, setActiveTab] = useState('Overview');

    const [pricingPlans, setPricingPlans] = useState(mockPricingPlans);
    const [transactions, setTransactions] = useState(mockTransactions);

    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showTxModal, setShowTxModal] = useState(false);

    const [planForm, setPlanForm] = useState({
        name: '', num_of_licences: '', price_per_licence: '', billing_cycle: ''
    });

    const [txForm, setTxForm] = useState({
        number: '', description: '', datetime: '', status: '', amount: ''
    });

    if (!app) return <div className="main-content">Application not found.</div>;

    const appPlans = pricingPlans.filter(p => p.app_id === app.id);
    const appTx = transactions.filter(t => t.app_id === app.id);

    const handleAddPlan = (e) => {
        e.preventDefault();
        const newPlan = { ...planForm, id: pricingPlans.length + 1, app_id: app.id };
        setPricingPlans(prev => [...prev, newPlan]);
        setPlanForm({ name: '', num_of_licences: '', price_per_licence: '', billing_cycle: '' });
        setShowPlanModal(false);
    };

    const handleAddTx = (e) => {
        e.preventDefault();
        const newTx = {
            ...txForm,
            id: transactions.length + 1,
            app_id: app.id
        };
        setTransactions(prev => [...prev, newTx]);
        setTxForm({ number: '', description: '', datetime: '', status: '', amount: '' });
        setShowTxModal(false);
    };

    return (
        <div className="main-content app-details">
            <h2>{app.name}</h2>
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-title">Annual Projected Spend</div>
                    <div className="stat-value">
                        ${pricingPlans
                            .filter(p => p.app_id === app.id)
                            .reduce((sum, p) => {
                                const multiplier = p.billing_cycle.toLowerCase() === 'monthly' ? 12 : 1;
                                return sum + (Number(p.num_of_licences) * Number(p.price_per_licence) * multiplier);
                            }, 0).toFixed(2)}
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Annual Actual Spend</div>
                    <div className="stat-value">
                        ${transactions
                            .filter(t => t.app_id === app.id && new Date(t.datetime) > new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
                            .reduce((sum, t) => sum + Number(t.amount), 0).toFixed(2)}
                    </div>
                </div>
            </div>



            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'Overview' && (
                    <div className="overview-info">
                        <p><strong>Category:</strong> {app.category}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        <p><strong>Renewal Date:</strong> {app.renewal_date}</p>
                        <p><strong>Owner:</strong> {app.owner}</p>
                        <p><strong>Notes:</strong> {app.notes}</p>
                    </div>
                )}

                {activeTab === 'Pricing Plans' && (
                    <div>
                        <button className="filters active" onClick={() => setShowPlanModal(true)}>
                            + Add Pricing Plan
                        </button>
                        <div className="apps-list" style={{ marginTop: '16px' }}>
                            {appPlans.map(plan => (
                                <div key={plan.id} className="app-card">
                                    <div className="left">{plan.name}</div>
                                    <div>{plan.num_of_licences} licences</div>
                                    <div>${plan.price_per_licence} per licence</div>
                                    <div>{plan.billing_cycle}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Transactions' && (
                    <div>
                        <button className="filters active" onClick={() => setShowTxModal(true)}>
                            + Add Transaction
                        </button>
                        <div className="apps-list" style={{ marginTop: '16px' }}>
                            {appTx.map(tx => (
                                <div key={tx.id} className="app-card">
                                    <div className="left">{tx.number}</div>
                                    <div>{tx.description}</div>
                                    <div>{new Date(tx.datetime).toLocaleString()}</div>
                                    <div>{tx.status}</div>
                                    <div>${tx.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Users' && <div></div>}
            </div>

            {showPlanModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add Pricing Plan</h3>
                        <form onSubmit={handleAddPlan}>
                            <input type="text" placeholder="Name" value={planForm.name} onChange={e => setPlanForm({ ...planForm, name: e.target.value })} required />
                            <input type="number" placeholder="Number of Licences" value={planForm.num_of_licences} onChange={e => setPlanForm({ ...planForm, num_of_licences: e.target.value })} required />
                            <input type="number" placeholder="Price per Licence" value={planForm.price_per_licence} onChange={e => setPlanForm({ ...planForm, price_per_licence: e.target.value })} required />
                            <input type="text" placeholder="Billing Cycle" value={planForm.billing_cycle} onChange={e => setPlanForm({ ...planForm, billing_cycle: e.target.value })} required />
                            <div className="modal-actions">
                                <button type="submit">Add</button>
                                <button type="button" onClick={() => setShowPlanModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showTxModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add Transaction</h3>
                        <form onSubmit={handleAddTx}>
                            <input type="text" placeholder="Transaction Number" value={txForm.number} onChange={e => setTxForm({ ...txForm, number: e.target.value })} required />
                            <input type="text" placeholder="Description" value={txForm.description} onChange={e => setTxForm({ ...txForm, description: e.target.value })} required />
                            <input type="datetime-local" value={txForm.datetime} onChange={e => setTxForm({ ...txForm, datetime: e.target.value })} required />
                            <input type="text" placeholder="Status" value={txForm.status} onChange={e => setTxForm({ ...txForm, status: e.target.value })} required />
                            <input type="number" placeholder="Amount" value={txForm.amount} onChange={e => setTxForm({ ...txForm, amount: e.target.value })} required />
                            <div className="modal-actions">
                                <button type="submit">Add</button>
                                <button type="button" onClick={() => setShowTxModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;
