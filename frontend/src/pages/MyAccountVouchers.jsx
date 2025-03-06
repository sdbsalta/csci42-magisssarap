import React from 'react';
import { Link } from "react-router-dom";
import Voucher1 from "../img/voucher1.png";
import Voucher2 from "../img/voucher2.png";

export const MyAccountVouchers = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#fdf9f2] p-8 space-y-6">
        <h1 className="text-3xl font-bold text-black">My Account</h1>

        {/* Tab Buttons */}
        <div className="flex w-full max-w-lg gap-x-4">
            <Link to="/account" className="flex-1">
                <button className="w-full bg-white text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-[#fee083] hover:text-black">
                    Account Settings 
                </button>
            </Link>
            <Link to="/account/vouchers" className="flex-1">
                <button className="w-full bg-[#fee083] text-black px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                    Vouchers
                </button>
            </Link>
        </div>

        {/* Voucher Images */}
        <div className="w-full max-w-lg flex flex-col space-y-4">
            <img src={Voucher1} alt="Free Delivery Voucher" className="w-full" />
            <img src={Voucher2} alt="50% Off Voucher" className="w-full" />
        </div>
    </div>
  );
}

export default MyAccountVouchers;
