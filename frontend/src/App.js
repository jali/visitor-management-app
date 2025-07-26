import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import SecurityDashboard from './components/SecurityDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import VisitDetails from './pages/VisitDetails';
import CreateVisit from './pages/CreateVisit';
import { decodedTokenData } from './services/auth'; // Import the function

function App() {
  const token = localStorage.getItem('token');
  const decoded = token ? decodedTokenData(token) : null;
  const role = decoded ? decoded.role : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token && role ? <Navigate to={role === 'resident' ? (Math.random() < 0.5 ? '/resident-dashboard' : '/create-visit') : `/${role}-dashboard`} /> : <Login />}
        />
        <Route
          path="/admin-dashboard"
          element={token && role === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/security-dashboard"
          element={token && role === 'security' ? <SecurityDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/resident-dashboard"
          element={token && role === 'resident' ? <ResidentDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/visits/:id"
          element={token ? <VisitDetails onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-visit"
          element={token && role === 'resident' ? <CreateVisit onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
