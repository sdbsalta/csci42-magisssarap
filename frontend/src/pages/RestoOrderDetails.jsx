import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import PhoneIcon from "../icons/phone.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';
import axios from 'axios';

export const RestoOrderDetails = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchOrder = async () => {
          try {
              const token = localStorage.getItem('accessToken');
              if (!token) {
                  console.error('No access token found in localStorage');
                  setError('Not authenticated. Please log in.');
                  setLoading(false);
                  return;
              }

              const axiosInstance = axios.create({
                  baseURL: 'http://127.0.0.1:8000',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });

              const response = await axiosInstance.get(`/order-detail/${order_id}/`);
              console.log('Response data:', response.data);
              setOrder(response.data.order);
              console.log('Order state set:', response.data.order);
              setLoading(false);
          } catch (err) {
              console.error('Error fetching orders:', err);
              if (err.response?.status === 401) {
                  setError('Session expired. Please log in again.');
              } else {
                  setError('Failed to fetch orders: ' + (err.response?.data?.detail || err.response?.data?.error || err.message));
              }
              setLoading(false);
          }
      };

      fetchOrder();
  }, [order_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fefaf5] p-8 w-full">
      {/* Order Header */}
      <div className="bg-[#fff3db] p-6 rounded-md flex flex-row justify-between items-center w-full">
        <h1 className="text-left font-semibold text-dark text-3xl md:text-3xl">
          Order <span className="text-primary font-bold">{order.order_id}</span> 😋
        </h1>
        <span className="bg-[#0B941B] text-white text-sm font-semibold px-4 py-2 rounded-full">
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 w-full mt-6">
        {order.items && order.items.length > 0 ? (
          order.items.map(item => (
            <OrderItem 
              key={item.food_item_name} 
              name={item.food_item_name} 
              price={item.price} 
              image={item.image || 'default_image_url.png'}
              displayType="static"
            />
          ))
        ) : (
          <p>No items found for this order.</p>
        )}
      </div>  

      {/* Order Details */}
      <div className="mt-1 w-full bg-[#fefaf5] space-y-4 p-4">
        {/* Delivery Time & Location */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={ClockIcon} alt="Clock" className="w-5 h-5" />
            <p className="text-gray-800"><span className="font-semibold">Estimated delivery time: {order.estimated_time}</span> </p>
            <Link to="/edittime">
                <button className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-4 py-3 rounded-full hover:bg-primary hover:text-white">
                    Edit
                </button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <img src={MapPinIcon} alt="Map Pin" className="w-5 h-5" />
            <p className="text-gray-800"><span className="font-semibold">Location: {order.location}</span> </p>
          </div>
        </div>

        {/* Voucher Applied */}
        <div className="flex items-center gap-2">
          <img src={VoucherIcon} alt="Voucher" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">{order.voucher_code ? order.voucher_code : 'No voucher applied'}</span></p>
        </div>

        {/* Number Details */}
        <div className="flex items-center gap-2">
          <img src={PhoneIcon} alt="Phone" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Customer's Number: {order.customer_phone}</span></p>
        </div>

        {/* Customer Note */}
        <div className="flex items-center gap-2">
          <img src={NoteIcon} alt="Note" className="w-5 h-5" />
          <p className="text-gray-800"><span className="font-semibold">Note from customer: {order.notes}</span></p>
        </div>
      </div>

      {/* Total & Actions */}
      <div className="w-full mt-6 mb-6 border-t border-b border-black pt-3 pb-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold p-4">Total</p>
          <p className="text-xl font-bold">₱{order.total_price}</p>
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
  );
};

export default RestoOrderDetails;
