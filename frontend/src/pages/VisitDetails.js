import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function VisitDetails() {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const [visit, setVisit] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVisit = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://192.168.1.188:8080/api/visit/${visitId}`, {
          headers: { 'x-auth-token': token },
        });
        setVisit(res.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch visit details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisit();
  }, [visitId, navigate]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#d32f2f' }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!visit) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3>Loading...</h3>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1976d2',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '20px auto',
        }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '500',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        Visit Details
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '10px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
      }}>
        <div style={{ fontWeight: '600', color: '#555' }}>Visitor Name:</div>
        <div>{visit.visitorName}</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Resident:</div>
        <div>{visit.residentId.username}</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Flat Number:</div>
        <div>{visit.flatNumber}</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Building Number:</div>
        <div>{visit.buildingNumber}</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Visit Time:</div>
        <div>{new Date(visit.visitTime).toLocaleString()}</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Duration:</div>
        <div>{visit.visitDuration} hours</div>
        <div style={{ fontWeight: '600', color: '#555' }}>Car Details:</div>
        <div>{visit.carDetails || 'N/A'}</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/visit/scan')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Back to Scan
        </button>
      </div>
    </div>
  );
}

export default VisitDetails;

