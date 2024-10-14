import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Upload from './Upload.jsx';
import Gallery from './Gallery.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ?<Login/>  : <Navigate to="/upload" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/login" /> : <Login />} />
        <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/gallery" element={isAuthenticated ? <Gallery /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
