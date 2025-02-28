import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="font-poppins">
        <nav>
          <a href="/login">Login</a> | 
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
