{/* /frontend/pages/Login.jsx */}
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, password }),
      });
  
      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);  // Log the response data to see what it contains
  
      if (response.ok && data.accessToken) {
        alert(`Login successful! Welcome, ${data.user_type}`);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.user.id);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error); // Log the error for debugging
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen rounded-md bg-accent-20 ">
      <div className="bg-secondary p-8 rounded-md shadow-lg flex flex-col items-center w-fit">
        <h1 className="text-center text-white text-3xl md:text-3xl mb-4">Login</h1>
        <div className="w-96">
          {/* user id */}
          <div className="form-control my-2">
            <input
              type="text"
              placeholder="User ID"
              className="input input-bordered bg-white text-black w-full border-black"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* pw */}
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered bg-white text-black w-full border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex gap-2 my-2 w-full">
          <button onClick={handleLogin} className="btn bg-[#ffe084] text-black border-0 flex-1 hover:bg-[#fffcf9]">
            Continue
          </button>
          <button className="btn bg-[#fffcf9] text-black border-0 flex-1 hover:bg-[#ffe084]">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
