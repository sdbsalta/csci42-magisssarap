import React, { useState } from "react";
import { Link } from "react-router-dom";
import Fries from "../img/fries.png";
import Salad from "../img/salad.png";

const Cart = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "French Fries", price: 150, quantity: 1, image: Fries },
    { id: 2, name: "Salad", price: 150, quantity: 1, image: Salad },
  ]);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      console.log("Updated cart:", newItems);
      return newItems;
    });
  };
  

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
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

          {/* Order Items */}
          <div className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-red-500 text-white p-4 rounded-lg flex items-start">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                <div className="flex flex-col ml-4">
                  <span className="font-bold">{item.name}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="btn btn-square bg-white text-black">
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="btn btn-square bg-white text-black">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
            <p className="text-xl font-bold">Total: ₱{totalPrice}</p>
            <div className="flex gap-4">
              <Link to="/cart" className="btn btn-outline">⬅ Back</Link>
              <button className="btn btn-primary">Confirm Order</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
