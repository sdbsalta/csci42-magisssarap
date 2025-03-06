import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import ContactFAQs from "./pages/ContactFAQs";
import Restaurants from "./pages/Restaurants";
import RestoView from "./pages/RestoView";
import CampusMap from "./pages/CampusMap";
import MyOrdersActive from "./pages/MyOrdersActive";
import MyOrdersPast from "./pages/MyOrdersPast";
import RestoOrdersActive from "./pages/RestoOrdersActive";
import RestoOrdersPast from "./pages/RestoOrdersPast";
import EditMenu from "./pages/EditMenu";
import ProductEdit from "./pages/ProductEdit";
import NavBar from "./components/NavBar";
import "./App.css";
import "./index.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/") 
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <div className="font-poppins flex">
        <NavBar />
        <div className="ml-64 p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactFAQs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/view" element={<RestoView />} />
            <Route path="/campusmap" element={<CampusMap />} />
            <Route path="/orders/active" element={<MyOrdersActive />} />
            <Route path="/orders/past" element={<MyOrdersPast />} />
            <Route path="/order/active" element={<RestoOrdersActive />} />
            <Route path="/order/past" element={<RestoOrdersPast />} />
            <Route path="/menu/edit" element={<EditMenu />} />
            <Route path="/productedit" element={<ProductEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;