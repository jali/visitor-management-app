// frontend/src/components/SecurityDashboard.js
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';

function SecurityDashboard({ onLogout }) {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisits = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/visits/active`, { // Assume backend endpoint for active visits
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
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
        <h1>Security Dashboard</h1>
        <button onClick={onLogout} className="button" style={{ backgroundColor: '#d32f2f', float: 'right' }}>Logout</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        {visits.map((visit) => (
          <div key={visit._id} className="card">
            <p>Visitor: {visit.visitorName}</p>
            <p>Flat: {visit.flatNumber}</p>
            <p>Building: {visit.buildingNumber}</p>
            <p>Status: Active</p>
          </div>
        ))}
      </div>
      {isLoading && <div style={{ /* Inline spinner */ }} />}
      {error && <div style={{ /* Inline error div */ }}>{error}</div>}
    </div>
  );
}

export default SecurityDashboard;
