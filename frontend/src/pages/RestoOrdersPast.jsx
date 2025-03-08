import React from 'react';
import { Link } from "react-router-dom";
import RestoLogo from "../img/baclogo.png";
import FoodItem from "../components/FoodItem";

export const RestoOrdersPast = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-accent-20 p-5 space-y-6">
        {/* Banner */}
        <div className="flex flex-col md:flex-row rounded-xl items-center gap-6 space-x-4 w-full">
            <div className="flex-shrink-0">
                <img 
                    src={RestoLogo} 
                    alt="Logo" 
                    className="w-124 h-124 md:w-85 md:h-85 rounded-xl object-cover"
                />
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-black font-semibold text-4xl md:text-5xl">
                    Welcome back, Name!
                </h1>

                {/* Buttons */}
                <div className="flex flex-row gap-3 mt-3">
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm cursor-not-allowed" disabled>
                        View Orders
                    </button>
                    <Link to="/menu/edit">
                        <button className="bg-white text-black border border-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary hover:text-white">
                            Edit Menu
                        </button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Order List */}
        <div className="bg-accent p-8 px-6 rounded-md flex flex-col items-center shadow-md w-full">
            <h1 className="text-center text-dark text-3xl md:text-3xl">Orders</h1>
            
            {/* Buttons Section */}
            <div className="flex flex-row gap-4 mt-6 w-full">
                <button className="w-1/2 bg-secondary text-white px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                    Past Orders
                </button>

                <Link to="/order/active" className="w-1/2">
                    <button className="w-full bg-accent text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-secondary hover:text-white">
                        Active Orders
                    </button>
                </Link>
            </div>
            
            {/* Orders List */}
            <div className="flex flex-col gap-4 mt-6 w-full">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white text-black py-4 rounded-lg border border-black w-full">
                        <div className="flex items-center gap-2 px-4">
                            <div className="badge badge-outline badge-neutral">Date</div>
                        </div>

                        <div className="flex items-center justify-between mt-2 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white font-bold rounded-md">{num}</div>
                                <span className="text-lg font-semibold">Order ID</span>
                            </div>
                            <Link to="/order#details">
                                <button className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-60">
                                    View Order
                                </button>
                            </Link>
                        </div>
                        
                        <div className="text-sm mt-1 ml-14">Total:</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Menu */}
        <div className="bg-primary p-8 px-6 rounded-md flex flex-col items-center shadow-md">
            <h1 className="text-center text-white text-3xl md:text-3xl mb-4">Menu</h1>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {[...Array(6)].map((_, index) => (
                    <FoodItem 
                        key={index}
                        FoodName="Bacsilog"
                        Price="₱99"
                        Location="Manila"
                        Rating="4.5"
                    />
                ))}
            </div>
        </div>    
    </div>
  );
};

export default RestoOrdersPast;
