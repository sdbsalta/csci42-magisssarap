import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios'

import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';

export const MyOrderDetails = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/orders/${orderId}/`)
      .then(response => {
        console.log("Order data received:", response.data);
        setOrder(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching order:", error);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Error: Order not found.</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">{order.order_id || "Unknown ID"}</span> 😋
        </h1>
        <span
          className={`text-black text-sm font-semibold px-4 py-2 rounded-full ${
            order.status === "Completed" ? "bg-[#34A641]" : "bg-[#fee083]"
          }`}
        >
          {order.status || "Unknown status"}
        </span>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 w-full mt-6">
        <OrderItem name="French Fries" price="₱150" image={Fries} displayType="static"/>
        <OrderItem name="Salad" price="₱150" image={Salad} displayType="static"/>
      </div>  
      {/* Order Details */}
      <div className="mt-1 w-full bg-[#fefaf5] space-y-4 p-4">
        
        {/* Delivery Time & Location */}
        <div className="flex justify-between items-center">
          {/* Estimated Delivery Time */}
          <div className="flex items-center gap-2">
            <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
            <p className="text-gray-800">
            <span className="font-semibold">
              Estimated delivery time:{" "}
              {order.date_created
                ? new Date(order.date_created).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  })
                : "Unknown time"}
            </span>
          </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800"><span className="font-semibold">Location: {order?.delivery?.delivery_location || "Unknown location"}</span> </p>
          </div>
        </div>

        {/* Voucher Applied */}
        <div className="flex items-center gap-2">
          <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">No voucher applied</span></p>
        </div>

        {/* Customer Note */}
        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Note from customer: {order.notes || "None"}</span></p>
        </div>
      </div>

      {/* Total & Actions */}
      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱{order.total_price || "Unknown price"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between items-center mt-4">
        <Link to="/orders/active">
            <img 
            src={BackIcon} 
            alt="Back Icon" 
            className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
            />
        </Link>
      </div>
    </div>
  )
}

export default MyOrderDetails;