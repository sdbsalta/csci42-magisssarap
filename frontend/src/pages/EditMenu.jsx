import React from 'react'
import { Link } from "react-router-dom";
import RestoLogo from "../img/baclogo.png";
import FoodItem from "../components/FoodItem";

export const EditMenu = () => {
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
                    <Link to="/order/active">
                        <button className="bg-white text-black border border-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary hover:text-white">
                            View Orders
                        </button>
                    </Link>
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm cursor-not-allowed" disabled>
                        Edit Menu
                    </button>
                </div>
            </div>
        </div>
        {/* Menu */}
        <div className="bg-primary p-8 px-6 rounded-md flex flex-col items-center shadow-lg">
            <h1 className="text-center text-3xl md:text-3xl text-white mb-3">Menu</h1>
            <h2 className="text-l text-white mb-4">Click on a food item to edit its contents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {[...Array(6)].map((_, index) => (
                    <Link 
                        to="/productedit" 
                        key={index} 
                        className="w-full transform transition-transform hover:scale-105 hover:shadow-lg">
                        <FoodItem 
                            FoodName="Bacsilog"
                            Price="₱99"
                            Location="Manila"
                            Rating="4.5"
                        />
                    </Link>
                ))}
            </div>
        </div>    
    </div>
  )
}

export default EditMenu;
