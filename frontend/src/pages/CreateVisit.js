import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { decodedTokenData } from '../services/auth';

function CreateVisit({ onLogout }) {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitTime: '',
    visitDuration: '',
    flatNumber: '',
    buildingNumber: '',
    carDetails: '',
    visitId: uuidv4(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = token ? decodedTokenData(token) : null;
  const userId = decoded ? decoded.id : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, residentId: userId }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/resident-dashboard');
      } else {
        setError(data.message || 'Failed to create visit');
      }
    } catch (err) {
      setError('Server error');
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Create New Visit</h1>
        <button onClick={onLogout} className="button" style={{ backgroundColor: '#d32f2f', float: 'right' }}>
          Logout
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="visitorName"
          value={formData.visitorName}
          onChange={handleChange}
          placeholder="Visitor Name"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="datetime-local"
          name="visitTime"
          value={formData.visitTime}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="number"
          name="visitDuration"
          value={formData.visitDuration}
          onChange={handleChange}
          placeholder="Duration (hours)"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          name="flatNumber"
          value={formData.flatNumber}
          onChange={handleChange}
          placeholder="Flat Number"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          name="buildingNumber"
          value={formData.buildingNumber}
          onChange={handleChange}
          placeholder="Building Number"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          name="carDetails"
          value={formData.carDetails}
          onChange={handleChange}
          placeholder="Car Details (optional)"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" disabled={isLoading} className="button">
          Create Visit
        </button>
      </form>
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

export default CreateVisit;
