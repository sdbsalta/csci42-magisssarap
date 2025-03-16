import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';

const Cart = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/orders/pending/", { withCredentials: true }) // may problem ulit sa auth side huhu - iya
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("No pending order:", error);
        alert("You have no pending orders. Please place an order first.");
        navigate("/restaurants/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);  

  if (loading) return <p>Loading order...</p>;

  if (!order) return null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">{order.order_id}</span> 😋
        </h1>
        <span className="bg-[#fee083] text-black text-sm font-semibold px-4 py-2 rounded-full">
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 w-full mt-6">
        <OrderItem name="French Fries" price="₱150" image={Fries} />
        <OrderItem name="Salad" price="₱150" image={Salad} />
      </div>  

      {/* Order Details */}
      <div className="mt-6 w-full bg-[#fefaf5] space-y-4 p-4">
        
      {/* Delivery Time & Location (Same Row) */}
      <div className="flex justify-between items-center w-full">
        {/* Estimated Delivery Time */}
        <div className="flex items-center gap-2">
          <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
          <p className="text-gray-800">
            <span className="font-semibold">Estimated delivery time:</span> 20 minutes
          </p>
        </div>

        {/* Location with Edit Button */}
        <div className="flex items-center gap-2">
          <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
          <label className="text-gray-800 font-semibold" htmlFor="location">Location:</label>
          <input 
            id="location"
            type="text" 
            defaultValue="CTC313" 
            className="w-24 p-2 input input-bordered bg-white text-black border-black rounded-md text-sm"
          />
          <Link to="/editlocation">
            <button className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-3 py-2 rounded-full hover:bg-primary hover:text-white">
              Edit
            </button>
          </Link>
        </div>
      </div>
 

      {/* voucher input */}
      <div className="flex items-center gap-2 w-full">
        <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
        <p className="text-gray-800 w-40"><span className="font-semibold">Voucher code:</span></p>
        <input 
          type="text" 
          placeholder="Enter code..." 
          className="flex-grow p-3 input input-bordered bg-white text-black border-black"
        />
      </div>

      {/* Customer Note */}
      <div className="flex items-center gap-2 w-full">
        <img src={NoteIcon} alt="Note" className="w-5 h-5" />
        <p className="text-gray-800 w-40"><span className="font-semibold">Note from customer:</span></p>
        <input 
          type="text" 
          placeholder="Add note..." 
          className="flex-grow p-3 input input-bordered bg-white text-black border-black"
        />
      </div>
      </div>

      {/* Total & Actions */}
      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱300</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between items-center mt-4">
        <Link to="/restaurants/view">
            <img 
            src={BackIcon} 
            alt="Back Icon" 
            className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
            />
        </Link>
        <Link to="/checkout">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700">
            Confirm Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
