import React from 'react';

function LandingPage() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: '500',
        color: '#333',
        marginBottom: '20px',
      }}>
        Welcome to the Visitor Management System
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.5',
        marginBottom: '20px',
      }}>
        Manage visitor access with ease. Residents can create visit passes, and admins can scan QR codes to verify visits. Please use the navigation links above to log in or access your dashboard.
      </p>
      <p style={{
        fontSize: '14px',
        color: '#777',
        fontStyle: 'italic',
      }}>
        Select <strong>Resident Login</strong> or <strong>Admin Login</strong> from the navigation bar to get started.
      </p>
    </div>
  );
}

export default LandingPage;