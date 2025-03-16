import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export const MyOrdersActive = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8000/orders/?status=active", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
    
                if (!response.ok) {
                    console.error("Failed to fetch orders. Status code:", response.status);
                    throw new Error("Failed to fetch orders");
                }
    
                const data = await response.json();
                console.log("Fetched orders:", data);  // ✅ Debugging log
                setOrders(data.filter(order => order.status !== "Completed"));  // Ensure correct filtering
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
    
        fetchOrders();
    }, []);    

    return (
        <div className="flex flex-col items-center min-h-screen bg-accent-20 p-8 w-full">
          <div className="bg-accent p-8 px-6 rounded-md flex flex-col items-center w-full shadow-lg">
            <h1 className="text-center text-dark text-3xl md:text-3xl">My Orders</h1>
            
            {/* Buttons Section */}
            <div className="flex flex-row gap-4 mt-6 w-full">
                    <Link to="/orders/past" className="w-1/2">
                        <button className="w-full bg-accent text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-primary hover:text-white">
                            Past Orders
                        </button>
                    </Link>
                    
                    <button className="w-1/2 bg-primary text-white px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
                        Active Orders
                    </button>
                </div>
          </div>
    
          {/* Orders List */}
          <div className="flex flex-col gap-4 mt-6 w-full">
            {orders.map((order, index) => (
              <div key={order.id} className="bg-white text-black py-4 rounded-lg border border-black w-full shadow-lg">
                <div className="flex items-center gap-2 px-4">
                <div className="badge badge-outline badge-neutral">
                    {new Date(order.date_created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                    </div>
                </div>
    
                <div className="flex items-center justify-between mt-2 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-secondary text-white font-bold rounded-md">
                        {index + 1}
                        </div>
                        {/* Wrap resto name and total price in one div */}
                        <div className="flex flex-col">
                        <span className="text-lg font-semibold">{order.restaurant_name || "Unknown Restaurant"}</span>
                        <span className="text-sm text-gray-400">Total: ${order.total_price}</span>
                        </div>
                    </div>
                    <Link to={`/myorder/details/${order.order_id}`}>
                        <button className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-60">
                        View Order
                        </button>
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default MyOrdersActive;
