import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ResidentLogin from './pages/ResidentLogin';
import AdminLogin from './pages/AdminLogin';
import CreateVisit from './pages/CreateVisit';
import VisitDetails from './pages/VisitDetails';

function ProtectedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token'); // Remove expired token
          return;
        }

        // Redirect authenticated users away from login pages
        const isLoginPage = location.pathname === '/resident/login' || location.pathname === '/admin/login';
        if (isLoginPage) {
          if (decoded.user.role === 'admin') {
            navigate('/visit/scan', { replace: true });
          } else if (decoded.user.role === 'resident') {
            console.log('navigate to resident')
            navigate('/resident/create-visit', { replace: true });
          }
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/resident/login" element={<ResidentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/resident/create-visit" element={<CreateVisit />} />
        <Route path="/visit/:visitId" element={<VisitDetails />} />
        <Route path="/visit/scan" element={<div>Admin Scan Page (TBD)</div>} />
      </Route>
      <Route path="*" element={<div>404: Page Not Found</div>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ProtectedRoutes />
    </Router>
  );
}

export default App;

