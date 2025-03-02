{/* /frontend/pages/SearchResto.jsx */}
import React from 'react'
import { Link } from "react-router-dom";
import BackIcon from "../icons/back.svg";
import SearchIcon from "../icons/search.svg";
import Bacsilog from "../icons/bacsilog.png";

export const SearchResto = () => {
    return (
      <div className="flex justify-center items-center h-screen rounded-md bg-accent">
          <div className="flex flex-col justify-center items-center h-full w-2/3 gap-4 rounded-lg p-4">
              {/* Top section with links and button */}
              <div className="flex justify-between w-full p-3 rounded-md">
                  <Link to="/restaurantlist">
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
                        className="input input-bordered bg-accent text-black w-full border-black pl-10"
                    />
              </div>


              {/* Resto Pic */}
              <div className="w-full flex justify-center rounded-md p-2">
                  <img src={Bacsilog} alt="RestoPic" className="w-full h-auto rounded-lg" />
              </div>

              {/* Resto Details */}
              <div className="w-full flex justify-center rounded-md p-2">
              </div>

              {/* Resto Reviews */}
              <div className="w-full flex justify-center rounded-md p-2">
              </div>

              {/* Menu */}
              <div className="w-full flex justify-center rounded-md p-2">
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
          </div>    
      </div>
    )
}

export default SearchResto