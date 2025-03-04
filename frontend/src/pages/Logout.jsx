{/* /frontend/pages/Logout.jsx */}
import React from 'react';
import { Link } from "react-router-dom";

export const Logout = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-accent-20">
      <div className="bg-primary-50 text-white w-[500px] rounded-2xl text-center shadow-lg">
        <div className="py-10">
          <p className="text-xl font-semibold">Are you sure you want to log out?</p>
        </div>
        <div className="border-t border-white w-full"></div>
        <div className="flex w-full">
          <Link to="/" className="w-1/2 border-r border-white">
            <button className="w-full py-4 text-white font-semibold">
              No
            </button>
          </Link>
          <Link to="/" className="w-1/2">
            <button className="w-full py-4 text-white font-semibold">
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
