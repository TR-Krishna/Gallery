import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Upload from './Upload';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/upload" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
