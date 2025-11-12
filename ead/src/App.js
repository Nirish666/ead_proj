import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
// --- ADD THESE IMPORTS ---
import Login from './pages/Login';
import Register from './pages/Register';
// --- END OF IMPORTS ---

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* --- ADD THESE ROUTES --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* --- END OF ROUTES --- */}

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;