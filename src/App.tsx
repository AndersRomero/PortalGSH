import React, { JSX, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AppsPage from './pages/AppsPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import './App.css';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-container">
        <video autoPlay loop muted className="video-background">
          <source src="/images/FONDO.mp4" type="video/mp4" />
        </video>
        <Header />
        <main className="flex-shrink-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
