{/* /frontend/pages/Login.jsx */}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Login successful! Welcome, ${data.user_type}`);
        localStorage.setItem("accessToken", data.accessToken);
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen rounded-md bg-accent-20 ">
      <div className="bg-secondary p-8 rounded-md shadow-lg flex flex-col items-center w-fit">
        <h1 className="text-white">Login</h1>
        <div className="w-96">
          {/* email */}
          <div className="form-control my-2">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered bg-white text-black w-full border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button onClick={handleLogin} className="btn bg-[#ffe084] text-black border-0 flex-1">
            Continue
          </button>
          <button className="btn bg-[#fffcf9] text-black border-0 flex-1">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
