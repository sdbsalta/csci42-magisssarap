
{/* /frontend/pages/Login.jsx */}
import React from 'react';

export const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen rounded-md bg-accent-20">
      <div className="bg-secondary p-8 rounded-md shadow-lg flex flex-col items-center w-fit">
            <h1 className="text-white">Login</h1>  
            <div className="w-96">

                {/* Email Input */}
                <div className="form-control">
                <label className="label"></label>
                <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered bg-white text-black w-full border-black"
                />
                </div>

                {/* Password Input */}
                <div className="form-control">
                <label className="label"></label>
                <input
                    type="text"
                    placeholder="Password"
                    className="input input-bordered bg-white text-black w-full border-black"
                />
                </div>
            </div>
            <div className="flex gap-2 my-2 w-full">
              <button className="btn bg-[#ffe084] text-black border-0 flex-1">Continue</button>
              <button className="btn bg-[#fffcf9] text-black border-0 flex-1">Sign Up</button>
            </div>
        </div>
    </div>
  );
};

export default Login;
