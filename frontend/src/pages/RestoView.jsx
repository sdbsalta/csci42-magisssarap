{/* /frontend/pages/SearchResto.jsx */}
import React from 'react'
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import FoodItem from "../components/FoodItem";
import BackIcon from "../icons/back.svg";
import SearchIcon from "../icons/search.svg";
import MapPinIcon from "../icons/MapPin.svg";
import Bacsilog from "../img/bacsilog.png";

export const RestoView = () => {
    return (
        <div className="flex justify-center items-center min-h-screen rounded-md bg-accent-20">
            <div className="flex flex-col justify-center items-center h-full w-2/3 gap-4 rounded-lg p-4">
                {/* Top section */}
                <div className="flex justify-between w-full rounded-md">
                    <Link to="/restaurants">
                        <div className="flex items-center">
                            <img src={BackIcon} alt="Back Icon" className="w-14 h-14" />
                        </div>
                    </Link>
                    <Link to="/campusmap">
                        <button className="btn bg-[#fec108] text-white border-0 px-4 py-2
                        hover:bg-secondary hover:text-white">
                            Check other restaurants
                        </button>
                    </Link>
                </div>
              
                {/* Search Section */}
                <div className="relative w-full">
                    <img 
                        src={SearchIcon} 
                        alt="Search Icon" 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="input input-bordered bg-accent-20 text-black w-full border-black pl-10"
                    />
                </div>


                {/* Resto Pic */}
                <div className="w-full flex justify-center rounded-md p-2">
                    <img src={Bacsilog} alt="RestoPic" className="w-full h-auto rounded-lg" />
                </div>

                {/* Resto Details */}
                <div className="w-full flex flex-col p-4 gap-2">
                    <h1 className="text-3xl font-bold text-gray-800">Restaurant Name</h1>
                    <div className="flex items-center">
                        <img src={MapPinIcon} alt="Map Pin Icon" className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-lg text-gray-700">Location</span>
                    </div>
                    <p className="text-gray-600 text-justify">
                        This is a brief description of the restaurant, its specialties, and what makes it unique. Enjoy a variety of delicious meals prepared with the finest ingredients.
                    </p>
                </div>

                {/* Resto Reviews */}
                <div className="w-full flex flex-col gap-4 p-2">
                    <div className="bg-white border border-black rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex text-yellow-500">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <div className="text-gray-800 font-semibold">
                                Name <span className="text-gray-500">• 5 mins ago</span>
                            </div>
                        </div>

                        <p className="text-gray-700 mt-2">
                            The food here is absolutely amazing! The flavors are rich, and the staff is friendly. Highly recommend!
                        </p>
                    </div>
                </div>
                {/* Menu */}
                <div className="grid gap-3 gap-x-2 gap-y-2 w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                    <FoodItem 
                        FoodName="Bacsilog"
                        Price="₱99"
                        Location="Gonzaga Cafeteria"
                        Rating="4.5"
                    />
                    <FoodItem 
                        FoodName="Bacsilog"
                        Price="₱99"
                        Location="Gonzaga Cafeteria"
                        Rating="4.5"
                    />
                    <FoodItem 
                        FoodName="Bacsilog"
                        Price="₱99"
                        Location="Gonzaga Cafeteria"
                        Rating="4.5"
                    />
                    <FoodItem 
                        FoodName="Bacsilog"
                        Price="₱99"
                        Location="Gonzaga Cafeteria"
                        Rating="4.5"
                    />    
                </div>

                {/* Reviews */}
                <div className="w-full flex justify-between items-center bg-primary text-white px-4 py-3 rounded-md">
                        <span className="text-lg font-semibold">Reviews</span>
                        <Link to="/reviews" className="text-lg font-semibold text-300 hover:text-gray-400">
                            See all
                        </Link>
                </div>
            </div>    
          
            {/* Cart Component */}
            <div className="flex flex-col justify-center items-center h-full w-1/3 rounded-lg p-4">
                <Cart />
            </div>    
      </div>
    )
}

export default RestoView