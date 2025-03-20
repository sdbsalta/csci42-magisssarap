import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import RestoLogo from "../img/baclogo.png";
import FoodItem from "../components/FoodItem";

export const RestoOrdersActive = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log('Fetching orders from active-orders endpoint...');
                // Using axios.create to prevent URL transformation
                const axiosInstance = axios.create({
                    baseURL: 'http://127.0.0.1:8000',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const response = await axiosInstance.get('/orders/active-orders/', {
                    transformRequest: [(data, headers) => {
                        return data;
                    }]
                });
                
                console.log('Raw response:', response);
                console.log('Response data:', response.data);
                console.log('Orders array:', response.data.orders);
                if (response.data.orders && response.data.orders.length > 0) {
                    console.log('First order example:', response.data.orders[0]);
                }
                setOrders(response.data.orders || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching orders:', err);
                console.error('Error response:', err.response);
                console.error('Error request config:', err.config);
                console.error('Error message:', err.message);
                console.error('Error details:', err.response?.data);
                setError('Failed to fetch orders: ' + (err.response?.data?.detail || err.message));
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                    <h1 className="text-dark font-semibold text-4xl md:text-5xl">
                        Welcome back!
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
            <div className="bg-accent p-8 px-6 rounded-md flex flex-col items-center shadow-lg w-full">
                <h1 className="text-center text-dark text-3xl md:text-3xl">Orders</h1>
                
                {/* Buttons Section */}
                <div className="flex flex-row gap-4 mt-6 w-full">
                    <Link to="/orders/past-orders" className="w-1/2">
                        <button className="w-full bg-accent text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-secondary hover:text-white">
                            Past Orders
                        </button>
                    </Link>
                    
                    <button className="w-1/2 bg-secondary text-white px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                        Active Orders
                    </button>
                </div>
                
                {/* Orders List */}
                <div className="flex flex-col gap-4 mt-6 w-full">
                    {loading ? (
                        <div className="text-center">Loading orders...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="text-center">No active orders found</div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.order_id} className="bg-white text-black py-4 rounded-lg border border-black w-full shadow-lg">
                                <div className="flex items-center gap-2 px-4">
                                    <div className="badge badge-outline badge-neutral">{order.date}</div>
                                </div>

                                <div className="flex items-center justify-between mt-2 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white font-bold rounded-md">
                                            {order.status.charAt(0)}
                                        </div>
                                        <span className="text-lg font-semibold">{order.order_id}</span>
                                    </div>
                                    <Link to={`/order/details/${order.order_id}`}>
                                        <button className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-60">
                                            View Order
                                        </button>
                                    </Link>
                                </div>
                                
                                <div className="text-sm mt-1 ml-14">Total: ₱{order.total}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Menu */}
            <div className="bg-primary p-8 px-6 rounded-md flex flex-col items-center shadow-lg">
                <h1 className="text-center text-3xl md:text-3xl text-white mb-4">Menu</h1>

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

export default RestoOrdersActive;
