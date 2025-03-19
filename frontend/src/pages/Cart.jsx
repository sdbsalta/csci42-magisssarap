import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem"; 
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import Fries from "../img/fries.png";
import Salad from "../img/salad.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "French Fries", price: 150, image: Fries },
    { id: 2, name: "Salad", price: 150, image: Salad },
  ]);

  const updateTotal = (amount) => {
    setCartItems((prevItems) => prevItems.map(item => ({ ...item }))); 
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">ORD-250101-001</span> 😋
        </h1>
        <span className="bg-[#fee083] text-black text-sm font-semibold px-4 py-2 rounded-full">
          Pending
        </span>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 w-full mt-6">
        {cartItems.map((item) => (
          <OrderItem key={item.id} {...item} updateTotal={updateTotal} />
        ))}
      </div>

      {/* Order Details */}
      <div className="mt-6 w-full bg-[#fefaf5] space-y-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
            <p className="text-gray-800 font-semibold">Estimated delivery time: 2:00 PM</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800 font-semibold">Location: CTC313</p>
            <Link to="/editlocation">
              <button className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-4 py-3 rounded-full hover:bg-primary hover:text-white">
                Edit
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
          <p className="text-gray-800 font-semibold">No voucher applied</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800 font-semibold">Note from customer:</p>
          <input 
            type="text" 
            placeholder="Add Note..." 
            className="w-4/5 p-3 input input-bordered bg-white text-black border-black"
          />
        </div>
      </div>

      {/* Total & Actions */}
      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱{totalPrice}</p>
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