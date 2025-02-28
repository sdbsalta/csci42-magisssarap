
{/* /frontend/pages/Login.jsx */}
import React from 'react';

export const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen rounded-md bg-accent">
      <div className="bg-secondary p-8 rounded-md shadow-lg flex flex-col items-center w-fit">
            <h1 className="text-white">Login</h1>  
            <div className="w-80 space-y-4">
                {/* Email Input */}
                <div className="form-control">
                <label className="label"></label>
                <input
                    type="text"
                    placeholder="Enter your email"
                    className="input input-bordered input-primary w-full"
                />
                </div>

                {/* Password Input */}
                <div className="form-control">
                <label className="label"></label>
                <input
                    type="text"
                    placeholder="Enter your password"
                    className="input input-bordered input-primary w-full"
                />
                </div>
             </div>
        </div>
    </div>
  );
};

export default Login;
