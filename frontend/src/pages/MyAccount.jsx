import React from 'react';
import { Link } from "react-router-dom";

export const MyAccount = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#fdf9f2] p-8 space-y-6">
        <h1 className="text-3xl font-bold text-black">My Account</h1>

        {/* Tab Buttons */}
        <div className="flex w-full max-w-lg gap-x-4">
            <Link to="/account" className="flex-1">
                <button className="w-full bg-[#fee083] text-black px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                    Account Settings 
                </button>
            </Link>
            <Link to="/account/vouchers" className="flex-1">
                <button className="w-full bg-white text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-[#fee083] hover:text-black">
                    Vouchers
                </button>
            </Link>
        </div>

        {/* Input Fields */}
        <div className="w-full max-w-lg flex flex-col space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 input input-bordered bg-white text-black border-black" />
            <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className="w-full p-3 input input-bordered bg-white text-black border-black" />
                <input type="text" placeholder="User ID:" className="w-full p-3 border border-black rounded-md bg-gray-300 text-gray-700" disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Contact Number" className="w-full p-3 input input-bordered bg-white text-black border-black" />
                <input type="password" placeholder="Password" className="w-full p-3 input input-bordered bg-white text-black border-black" />
            </div>
        </div>

        <button className="w-full max-w-lg bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700">
            Save Changes
        </button>
    </div>
  );
}

export default MyAccount;
