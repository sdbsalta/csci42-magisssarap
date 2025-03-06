import React from 'react';

export const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-white text-2xl font-bold mb-4">Sign Up</h1>  
        <div className="w-full space-y-3">

          {/* Full Name Input */}
          <div className="form-control">
            <input type="text" placeholder="Full Name" className="input input-bordered bg-white text-black w-full border-black" />
          </div>
          
          {/* Email Input */}
          <div className="form-control">
            <input type="text" placeholder="Email" className="input input-bordered bg-white text-black w-full border-black" />
          </div>
          
          {/* Contact Number Input */}
          <div className="form-control">
            <input type="text" placeholder="Contact Number" className="input input-bordered bg-white text-black w-full border-black" />
          </div>
          
          {/* Username Input */}
          <div className="form-control">
            <input type="text" placeholder="Username" className="input input-bordered bg-white text-black w-full border-black" />
          </div>
          
          {/* Password Input */}
          <div className="form-control">
            <input type="password" placeholder="Password" className="input input-bordered bg-white text-black w-full border-black" />
          </div>
          
        </div>
        <button className="btn bg-[#ffe084] text-black border-0 mt-4 w-full">Continue</button>
      </div>
    </div>
  );
};

export default SignUp;