import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StarIcon from "../icons/Star.png";
import BackIcon from "../icons/back.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';

export const Ratings = () => {
  // Static past orders with items
  const pastOrders = [
    {
      id: 1,
      orderNumber: "ORD-250101-001",
      items: [
        { id: 1, name: "French Fries", image: Fries },
        { id: 2, name: "Salad", image: Salad }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-250101-002",
      items: [
        { id: 3, name: "French Fries", image: Fries }, // Assuming you have a burger image
        { id: 4, name: "Salad", image: Salad }   // Assuming you have a pizza image
      ]
    }
  ];

  const [ratings, setRatings] = useState({});

  const handleRatingChange = (orderId, itemId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [`${orderId}-${itemId}`]: rating
    }));
  };

  const handleSubmitRating = (orderId) => {
    // Handle submission of ratings for the order
    console.log(`Ratings for order ${orderId}:`, ratings);
    alert(`Thank you for rating order ${orderId}!`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Rate Your Orders
        </h1>
      </div>

      {/* Past Orders List */}
      <div className="w-full space-y-6">
        {pastOrders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order {order.orderNumber}</h2>
            {order.items.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                  <p className="ml-4 text-gray-800">{item.name}</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <img
                      key={star}
                      src={StarIcon}
                      alt={`Star ${star}`}
                      className={`w-6 h-6 cursor-pointer ${ratings[`${order.id}-${item.id}`] >= star ? 'opacity-100' : 'opacity-30'}`}
                      onClick={() => handleRatingChange(order.id, item.id, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleSubmitRating(order.id)}
              className="w-full bg-[#0B941B] text-white py-2 rounded-md hover:bg-[#088015] transition-colors"
            >
              Submit Rating
            </button>
          </div>
        ))}
      </div>

      {/* Back Button at the Bottom */}
      <div className="w-full mt-6 flex justify">
        <Link to="/orders">
          <img 
            src={BackIcon} 
            alt="Back Icon" 
            className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
          />
        </Link>
      </div>
    </div>
  );
};

export default Ratings;