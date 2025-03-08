import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "../icons/back.svg";
import Fries from '../img/fries.png';
import Salad from '../img/salad.png';
import OrderItem from '../components/OrderItem'

const Cart = () => {
  return (
    <div className="flex min-h-screen bg-accent-20">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Order Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Order <span className="text-primary">ORD-250101-001</span> 🥰
            </h1>
            <span className="badge badge-warning text-sm p-3">Pending</span>
          </div>
          <div className="flex flex-col gap-4">
          {/* Item 1 */}
            <OrderItem name="French Fries" price="P150" image={Fries} />
          {/* Item 2 */}
            <OrderItem name="Salad" price="P150" image={Salad} />
          </div>  
          {/* Order Details */}
          <div className="mt-6 space-y-2">
            <p>📅 <strong>Estimated delivery time:</strong> 2:00 PM</p>
            <p>
              📍 <strong>Location:</strong> CTC313
              <button className="btn btn-xs btn-outline ml-2">Edit</button>
            </p>
            <input type="text" placeholder="Apply a voucher" className="input input-bordered w-full mt-2" />
            <textarea placeholder="Add a note for the restaurant..." className="textarea textarea-bordered w-full mt-2"></textarea>
          </div>

          {/* Total & Actions */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ₱300</p>
            <div className="flex gap-4">
              <Link to="/restaurants">
                  <img 
                  src={BackIcon} 
                  alt="Back Icon" 
                  className="w-14 h-14 transition-transform transform hover:scale-110 hover:opacity-80"
                  />
              </Link>
              <button className="btn btn-primary">Confirm Order</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;