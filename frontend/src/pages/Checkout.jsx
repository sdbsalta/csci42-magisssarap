import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';
import { voucherApi } from '../services/api';

export const Checkout = () => {
  const orderItems = [
    { id: 1, name: "French Fries", price: 150, image: Fries, quantity: 2 },
    { id: 2, name: "Salad", price: 150, image: Salad, quantity: 1 }
  ];

  const initialTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [originalTotal] = useState(initialTotal);
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [message, setMessage] = useState('');
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    voucherApi.getUserVouchers()
      .then(response => setVouchers(response.data))
      .catch(error => console.error('Error fetching vouchers:', error));
  }, []);

  const discountedTotal = originalTotal * (1 - discount / 100);

  const handleApplyVoucher = async () => {
    setMessage("");
    try {
      const response = await voucherApi.applyVoucher(voucherCode);
      const { discount } = response.data;
      setDiscount(discount);
      setAppliedVoucher(voucherCode);
      setMessage("Voucher applied successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid or expired voucher.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">ORD-250101-001</span> 😋
        </h1>
        <span className="bg-[#0B941B] text-white text-sm font-semibold px-4 py-2 rounded-full">
          Active
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full mt-6">
        {orderItems.map(item => (
          <OrderItem key={item.id} {...item} isStatic={true} />
        ))}
      </div>

      <div className="text-[#0B941B] font-semibold text-left mt-6 self-start">
        Order confirmed! Please prepare cash payment.
      </div>

      <div className="mt-1 w-full bg-[#fefaf5] space-y-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
            <p className="text-gray-800 font-semibold">Estimated delivery time: 2:00 PM</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800 font-semibold">Location: CTC313</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
            <p className="text-gray-800 font-semibold">
              {appliedVoucher ? `Voucher applied: ${appliedVoucher} (-₱${(originalTotal * discount / 100).toFixed(2)})` : "No voucher applied"}
            </p>
          </div>
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="border px-3 py-2 rounded-md"
            />
            <button 
              onClick={handleApplyVoucher}
              className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
            >
              Apply
            </button>
          </div>
          {message && <p className="text-sm text-red-600">{message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800 font-semibold">Note from customer: make it fast po.</p>
        </div>
      </div>

      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱{discount > 0 ? discountedTotal.toFixed(2) : originalTotal}</p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-4">
        <Link to="/orders/active">
          <img src={BackIcon} alt="Back Icon" className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80" />
        </Link>
      </div>
    </div>
  );
};

export default Checkout;