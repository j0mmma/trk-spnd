import React, { useEffect, useState } from 'react';
import '../App.css';

const Procurement = () => {
    const [procurementRequests, setProcurementRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newRequest, setNewRequest] = useState({
        description: '',
        type: 'New Purchase',
        status: 'New',
        deadline: '',
        created_by_id: '',
        approver_id: ''
    });

    useEffect(() => {
        const fetchProcurementRequests = async () => {
            try {
                const res = await fetch(`${process.env.PUBLIC_URL}/mock_spndb.json`);
                const data = await res.json();
                setProcurementRequests(data.procurement_requests);
            } catch (error) {
                console.error('Error fetching procurement requests:', error);
            }
        };

        fetchProcurementRequests();
    }, []);

    const handleAddRequest = (e) => {
        e.preventDefault();
        const newRequestWithId = {
            ...newRequest,
            id: procurementRequests.length + 1,
        };
        setProcurementRequests((prev) => [...prev, newRequestWithId]);
        setNewRequest({
            description: '',
            type: 'New Purchase',
            status: 'New',
            deadline: '',
            created_by_id: '',
            approver_id: ''
        });
        setShowModal(false);
    };

    const handleApproveRequest = (id) => {
        setProcurementRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Approved' } : req
            )
        );
    };

    const handleCancelRequest = (id) => {
        setProcurementRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Canceled' } : req
            )
        );
    };

    const handleEditRequest = (id) => {
        const requestToEdit = procurementRequests.find((req) => req.id === id);
        setSelectedRequest(requestToEdit);
        setShowDetailsModal(true);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const updatedRequest = { ...selectedRequest };
        setProcurementRequests((prev) =>
            prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
        );
        setShowDetailsModal(false);
    };

    return (
        <div className="main">
            <h1>Procurement Requests</h1>

            <button className="filters active" onClick={() => setShowModal(true)}>
                + Add Procurement Request
            </button>

            <div className="procurement-requests-list" style={{ marginTop: '16px' }}>
                <div className="procurement-card-header">
                    <div><strong>Application</strong></div>
                    <div><strong>Type</strong></div>
                    <div><strong>Status</strong></div>
                    <div><strong>Deadline</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {procurementRequests.map((request) => (
                    <div key={request.id} className="procurement-card">
                        <div>{request.description}</div>
                        <div>{request.type}</div>
                        <div>{request.status}</div>
                        <div>{new Date(request.deadline).toLocaleDateString()}</div>
                        <div>
                            <button
                                className="view-btn"
                                onClick={() => handleEditRequest(request.id)}
                            >
                                View
                            </button>
                            <button
                                className="approve-btn"
                                onClick={() => handleApproveRequest(request.id)}
                                disabled={request.status === 'Approved' || request.status === 'Canceled'}
                            >
                                Approve
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => handleCancelRequest(request.id)}
                                disabled={request.status === 'Approved' || request.status === 'Canceled'}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add Procurement Request</h3>
                        <form onSubmit={handleAddRequest}>
                            <input
                                type="text"
                                placeholder="Description"
                                value={newRequest.description}
                                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Type"
                                value={newRequest.type}
                                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Status"
                                value={newRequest.status}
                                onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                                required
                            />
                            <input
                                type="date"
                                value={newRequest.deadline}
                                onChange={(e) => setNewRequest({ ...newRequest, deadline: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Created By (User ID)"
                                value={newRequest.created_by_id}
                                onChange={(e) => setNewRequest({ ...newRequest, created_by_id: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Approver (User ID)"
                                value={newRequest.approver_id}
                                onChange={(e) => setNewRequest({ ...newRequest, approver_id: e.target.value })}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit">Add Request</button>
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDetailsModal && selectedRequest && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Procurement Request</h3>
                        <form onSubmit={handleSaveEdit}>
                            <input
                                type="text"
                                value={selectedRequest.description}
                                onChange={(e) =>
                                    setSelectedRequest({ ...selectedRequest, description: e.target.value })
                                }
                                required
                            />
                            <input
                                type="text"
                                value={selectedRequest.type}
                                onChange={(e) => setSelectedRequest({ ...selectedRequest, type: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                value={selectedRequest.status}
                                onChange={(e) => setSelectedRequest({ ...selectedRequest, status: e.target.value })}
                                required
                            />
                            <input
                                type="date"
                                value={selectedRequest.deadline}
                                onChange={(e) => setSelectedRequest({ ...selectedRequest, deadline: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                value={selectedRequest.created_by_id}
                                onChange={(e) =>
                                    setSelectedRequest({ ...selectedRequest, created_by_id: e.target.value })
                                }
                                required
                            />
                            <input
                                type="number"
                                value={selectedRequest.approver_id}
                                onChange={(e) =>
                                    setSelectedRequest({ ...selectedRequest, approver_id: e.target.value })
                                }
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit">Save Changes</button>
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={() => setShowDetailsModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Procurement;
