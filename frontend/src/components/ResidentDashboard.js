import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

function ResidentDashboard({ onLogout }) {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisits = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/visit/my-visits`, {
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
        <h1>Resident Dashboard</h1>
        <div>
          <button
            onClick={() => navigate('/create-visit')}
            className="button"
            style={{ backgroundColor: '#2ecc71', marginRight: '10px' }}
          >
            Create New Visit
          </button>
          <button onClick={onLogout} className="button" style={{ backgroundColor: '#d32f2f' }}>
            Logout
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        {visits.map((visit) => (
          <div key={visit._id} className="card">
            <p>Visitor: {visit.visitorName}</p>
            <p>Time: {new Date(visit.visitTime).toLocaleString()}</p>
            <p>Duration: {visit.visitDuration} hours</p>
            <p>Car Details: {visit.carDetails || 'N/A'}</p>
          </div>
        ))}
      </div>
      {isLoading && (
        <div
          style={{
            width: '24px',
            height: '24px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '10px auto',
          }}
        />
      )}
      {error && (
        <div
          style={{
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '10px',
            border: '1px solid #d32f2f',
            borderRadius: '4px',
            margin: '10px auto',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default ResidentDashboard;
