import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import RealEstate from './pages/RealEstate';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/real-estate" element={<RealEstate />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;