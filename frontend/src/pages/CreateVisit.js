import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

function CreateVisit() {
  const [visitorName, setVisitorName] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitDuration, setVisitDuration] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [error, setError] = useState('');
  const qrRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }
      const res = await axios.post(
        'http://localhost:8080/api/visit',
        { visitorName, visitTime, visitDuration, carDetails },
        { headers: { 'x-auth-token': token } }
      );
      setQrUrl(res.data.url);
    } catch (err) {
      alert('Error creating visit');
    }
  };

  useEffect(() => {
    if (qrUrl && qrRef.current) {
      qrRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [qrUrl]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create Visit</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          placeholder="Visitor Name"
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <input
          type="datetime-local"
          value={visitTime}
          onChange={(e) => setVisitTime(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <input
          type="number"
          value={visitDuration}
          onChange={(e) => setVisitDuration(e.target.value)}
          placeholder="Duration (hours)"
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <input
          type="text"
          value={carDetails}
          onChange={(e) => setCarDetails(e.target.value)}
          placeholder="Car Details (optional)"
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button 
            type="submit"
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
            Generate QR Code
        </button>
      </form>
      {qrUrl && (
        <div ref={qrRef}>
          <h3>QR Code for Visitor</h3>
          <QRCodeCanvas value={qrUrl}  style={{width: "100%", height: "100%"}}/>
        </div>
      )}
    </div>
  );
}

export default CreateVisit;
