// frontend/src/pages/VisitDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

function VisitDetails({ onLogout }) {
  const [visit, setVisit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVisit = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('security_token');
        const response = await axios.get(`${API_BASE_URL}/visits/${id}`, {
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          setVisit(data);
        } else {
          setError(data.message || 'Failed to fetch visit');
        }
      } catch (err) {
        setError('Server error');
      }
      setIsLoading(false);
    };
    fetchVisit();
  }, [id]);

  return (
    <div className="container">
      <div className="header">
        <h1>Visit Details</h1>
        <button onClick={onLogout} className="button" style={{ backgroundColor: '#d32f2f', float: 'right' }}>Logout</button>
      </div>
      {isLoading && <div style={{ /* Inline spinner */ }} />}
      {error && <div style={{ /* Inline error div */ }}>{error}</div>}
      {visit && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p>Visitor: {visit.visitorName}</p>
          <p>Time: {new Date(visit.visitTime).toLocaleString()}</p>
          <p>Duration: {visit.visitDuration} hours</p>
          <p>Flat: {visit.flatNumber}</p>
          <p>Building: {visit.buildingNumber}</p>
          <p>Car Details: {visit.carDetails || 'N/A'}</p>
          <p>Visit ID: {visit.visitId}</p>
        </div>
      )}
    </div>
  );
}

export default VisitDetails;
