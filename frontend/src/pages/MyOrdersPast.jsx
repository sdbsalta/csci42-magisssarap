{/* /frontend/pages/MyOrdersPast.jsx */}
import React from 'react'
import { Link } from "react-router-dom";

export const MyOrdersPast = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-accent-20 p-8 w-full">
        <div className="bg-accent p-8 px-6 rounded-md flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold text-black">My Orders</h1>
            
            {/* Buttons Section */}
            <div className="flex flex-row gap-4 mt-6 w-full">
                <button className="w-1/2 bg-primary text-white px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                    Past Order
                </button>

                <Link to="/myordersactive" className="w-1/2">
                <button className="w-full bg-accent text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-primary hover:text-white">
                    Active Order
                </button>
                </Link>
            </div>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-4 mt-6 w-full">
            <div className="bg-white text-black py-4 rounded-lg border border-black w-full">
                <div className="flex items-center gap-2 px-4">
                    <div className="badge badge-outline badge-neutral">Date</div>
                </div>

                <div className="flex items-center justify-between mt-2 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white font-bold rounded-md">1</div>
                        <span className="text-lg font-semibold">Resto Name</span>
                    </div>
                    <Link to="/order#details">
                        <button className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-60">
                            View Order
                        </button>
                    </Link>
                </div>
                
                <div className="text-sm mt-1 ml-14">Total:</div>
            </div>
            <div className="bg-white text-black py-4 rounded-lg border border-black w-full">
                <div className="flex items-center gap-2 px-4">
                    <div className="badge badge-outline badge-neutral">Date</div>
                </div>

                <div className="flex items-center justify-between mt-2 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white font-bold rounded-md">2</div>
                        <span className="text-lg font-semibold">Resto Name</span>
                    </div>
                    <Link to="/order#details">
                        <button className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-60">
                            View Order
                        </button>
                    </Link>
                </div>
                
                <div className="text-sm mt-1 ml-14">Total:</div>
            </div>
        </div>
    </div>
  )
}

export default MyOrdersPast;
