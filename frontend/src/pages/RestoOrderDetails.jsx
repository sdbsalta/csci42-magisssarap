import React from 'react'
import { Link } from "react-router-dom";
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import PhoneIcon from "../icons/phone.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';

export const RestoOrderDetails = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">ORD-250101-001</span> 😋
        </h1>
        <span className="bg-[#0B941B] text-white text-sm font-semibold px-4 py-2 rounded-full">
          Active
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
            <p className="text-gray-800"><span className="font-semibold">Estimated delivery time: 2:00 PM</span> </p>
            <Link to="/edittime">
                <button className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-4 py-3 rounded-full hover:bg-primary hover:text-white">
                    Edit
                </button>
            </Link>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800"><span className="font-semibold">Location: CTC313</span> </p>
          </div>
        </div>

        {/* Voucher Applied */}
        <div className="flex items-center gap-2">
          <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">No voucher applied</span></p>
        </div>

        {/* Number Details */}
        <div className="flex items-center gap-2">
          <img src={PhoneIcon} alt="Phone" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Customer's Number: 09999999999</span></p>
        </div>

        {/* Customer Note */}
        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Note from customer: make it fast po.</span></p>
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
        <Link to="/order/active">
            <img 
            src={BackIcon} 
            alt="Back Icon" 
            className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
            />
        </Link>
        <Link to="/order/active">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700">
                Order Complete
            </button>
        </Link>
      </div>
    </div>
  )
}

export default RestoOrderDetails;
