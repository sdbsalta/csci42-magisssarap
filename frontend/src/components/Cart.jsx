<<<<<<< HEAD
import React from 'react';
import { Link } from "react-router-dom";
import TrashIcon from "../icons/trash.svg";
=======
import React, { useState, useEffect } from 'react';
>>>>>>> frontend/rafa/cartLogic
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem';

export const Cart = () => {
  // State to track total price
  const [total, setTotal] = useState(300); // Default total (P150 + P150)

  // Function to update total price
  const updateTotal = (amount) => {
    setTotal(prevTotal => Math.max(0, prevTotal + amount)); // Prevents negative total
  };

  // useEffect to log total when it changes
  useEffect(() => {
    console.log("Updated Total:", total);
  }, [total]);  // Runs whenever total changes

  return (
    <div className="bg-[#fff6ea] w-full h-full rounded-xl p-6 shadow-md border border-black shadow-lg">
      {/* Cart Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-dark text-3xl md:text-3xl">Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        <OrderItem name="French Fries" price={150} image={Fries} updateTotal={updateTotal} />
        <OrderItem name="Salad" price={150} image={Salad} updateTotal={updateTotal} />
      </div>  

      {/* Voucher Input */}
      <input
        type="text"
        placeholder="Voucher Code..."
        className="w-full mt-4 p-2 border border-gray-400 rounded-md text-gray-700"
      />

      {/* Price Summary */}
      <div className="flex flex-col mt-4 text-dark">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold">P{total}.00</span>  {/* Now updates dynamically */}
        </div>
      </div>

      {/* Order Button */}
      <Link to="/cart">
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default Cart;
