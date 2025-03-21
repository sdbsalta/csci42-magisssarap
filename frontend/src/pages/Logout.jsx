import React from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        credentials: "include",  // cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("You have successfully logged out!"); 
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; 
      } else {
        console.error("Logout failed", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-accent-20">
      <div className="bg-primary-50 text-white w-[500px] rounded-2xl text-center shadow-lg">
        <div className="py-10">
          <p className="text-xl font-semibold">Are you sure you want to log out?</p>
        </div>
        <div className="border-t border-white w-full"></div>
        <div className="flex w-full">
          <button 
            className="w-1/2 py-4 text-white font-semibold border-r border-white transition duration-200 hover:text-black" 
            onClick={() => navigate("/")}
          >
            No
          </button>
          <button 
            className="w-1/2 py-4 text-white font-semibold transition duration-200 hover:text-black" 
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
