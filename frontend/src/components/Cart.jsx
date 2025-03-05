import React from 'react';
import TrashIcon from "../icons/trash.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem'

export const Cart = () => {
  return (
    <div className="bg-[#fff6ea] w-full h-full rounded-xl p-6 shadow-md border border-black">
      {/* Cart Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cart</h2>
      </div>
      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {/* Item 1 */}
        <OrderItem name="French Fries" price="P150" image={Fries} />
        {/* Item 2 */}
        <OrderItem name="Salad" price="P150" image={Salad} />
      </div>  
      {/* Voucher Input */}
      <input
        type="text"
        placeholder="Voucher Code..."
        className="w-full mt-4 p-2 border border-gray-400 rounded-md text-gray-700"
      />
      {/* Price Summary */}
      <div className="flex flex-col mt-4 text-gray-800">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold">P100.00</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="font-semibold text-red-500">-P50</span>
        </div>
      </div>
      {/* Order Button */}
      <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700">
        Order Now
      </button>
    </div>
  );
};

export default Cart;
