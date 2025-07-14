import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    }}>
      <nav style={{
        backgroundColor: '#1976d2',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap',
      }}>
        <Link
          to="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          Home
        </Link>
        <Link
          to="/resident/login"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          Resident Login
        </Link>
        <Link
          to="/admin/login"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          Admin Login
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              color: '#fff',
              backgroundColor: '#d32f2f',
              fontSize: '1.1rem',
              fontWeight: '500',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#b71c1c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#d32f2f')}
          >
            Logout
          </button>
        )}
      </nav>
      <main style={{ flex: 1, padding: '20px 5%' }}>
        <Outlet />
      </main>
      <style>
        {`
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              align-items: center;
              gap: 10px;
              padding: 10px;
            }
            nav a, nav button {
              font-size: 1rem;
              padding: 6px 10px;
              width: 100%;
              text-align: center;
            }
          }
          @media (max-width: 480px) {
            nav a, nav button {
              font-size: 0.9rem;
              padding: 5px 8px;
            }
            main {
              padding: 15px 3%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout;