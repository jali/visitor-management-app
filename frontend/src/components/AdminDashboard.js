import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

function AdminDashboard({ onLogout }) {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisits = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('security_token');
        const response = await axios.get(`${API_BASE_URL}/visits`, { // Assume backend endpoint for all visits
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          setVisits(data);
        } else {
          setError(data.message || 'Failed to fetch visits');
        }
      } catch (err) {
        setError('Server error');
      }
      setIsLoading(false);
    };
    fetchVisits();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="button" style={{ backgroundColor: '#d32f2f', float: 'right' }}>Logout</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        {visits.map((visit) => (
          <div key={visit._id} className="card">
            <p>Visitor: {visit.visitorName}</p>
            <p>Flat: {visit.flatNumber}</p>
            <p>Building: {visit.buildingNumber}</p>
            <p>Time: {new Date(visit.visitTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {isLoading && <div style={{ /* Inline spinner */ }} />}
      {error && <div style={{ /* Inline error div */ }}>{error}</div>}
    </div>
  );
}

export default AdminDashboard;
