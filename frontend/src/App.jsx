import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import ContactFAQs from "./pages/ContactFAQs";
import SearchResto from "./pages/SearchResto";
import CampusMap from "./pages/CampusMap";
import NavBar from "./components/NavBar";
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="font-poppins flex">
        <NavBar />
        <div className="ml-64 p-4 flex-grow">
          <Routes>
            <Route path="/contact" element={<ContactFAQs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants" element={<SearchResto />} />
            <Route path="/campusmap" element={<CampusMap />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
