import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AppsPage from './pages/AppsPage';
import AdminPage from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="flex-shrink-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;