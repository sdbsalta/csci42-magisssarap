import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import PhoneIcon from "../icons/phone.svg";
import OrderItem from '../components/OrderItem';

export const RestoOrderDetails = () => {
  const { order_id } = useParams(); // Get order_id from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get JWT Token
        if (!token) throw new Error("Unauthorized access. Please log in.");

        const response = await axios.get(`http://127.0.0.1:8000/orders/order-detail/${order_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setOrder(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (order_id) {
      fetchOrderDetails();
    }
  }, [order_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">{order?.order_id || "Unknown"}</span> 😋
        </h1>
        <span className="bg-[#0B941B] text-white text-sm font-semibold px-4 py-2 rounded-full">
          {order?.status || "Pending"}
        </span>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 w-full mt-6">
        {order?.items?.map((item, index) => (
          <OrderItem 
            key={index} 
            name={item.name} 
            price={`₱${item.price}`} 
            image={item.image_url} 
            displayType="static"
          />
        ))}
      </div>  

      {/* Order Details */}
      <div className="mt-1 w-full bg-[#fefaf5] space-y-4 p-4">
        {/* Delivery Time & Location */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
            <p className="text-gray-800">
              <span className="font-semibold">Estimated delivery time: {order?.delivery_time || "N/A"}</span>
            </p>
            <Link to="/edittime">
              <button className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-4 py-3 rounded-full hover:bg-primary hover:text-white">
                Edit
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800"><span className="font-semibold">Location: {order?.location || "Unknown"}</span></p>
          </div>
        </div>

        {/* Voucher Applied */}
        <div className="flex items-center gap-2">
          <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">{order?.voucher || "No voucher applied"}</span></p>
        </div>

        {/* Customer Contact */}
        <div className="flex items-center gap-2">
          <img src={PhoneIcon} alt="Phone" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Customer's Number: {order?.customer_phone || "Unknown"}</span></p>
        </div>

        {/* Customer Note */}
        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Note from customer: {order?.customer_note || "None"}</span></p>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱{order?.total_price || "0"}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-between items-center mt-4">
        <Link to="/order/active">
          <img 
            src={BackIcon} 
            alt="Back Icon" 
            className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
          />
        </Link>
        <button 
          className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700"
          onClick={async () => {
            try {
              const token = localStorage.getItem("accessToken");
              if (!token) throw new Error("Unauthorized access.");

              await axios.patch(`http://127.0.0.1:8000/orders/order-detail/${order_id}/`, 
                { status: "Completed" }, 
                { headers: { Authorization: `Bearer ${token}` } }
              );

              alert("Order marked as complete!");
              window.location.href = "/order/active";
            } catch (err) {
              alert("Error completing order: " + err.message);
            }
          }}
        >
          Order Complete
        </button>
      </div>
    </div>
  );
}

export default RestoOrderDetails;
