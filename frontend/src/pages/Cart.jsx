import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderItem from "../components/OrderItem"; 
import MapPinIcon from "../icons/MapPin.svg";
import BackIcon from "../icons/back.svg";
import ClockIcon from "../icons/clock.svg";
import NoteIcon from "../icons/Note.svg";
import VoucherIcon from "../icons/Ticket.svg";
import Fries from "../img/fries.png";
import Salad from "../img/salad.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [location, setLocation] = useState("CTC313");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve JWT from localStorage
      const response = await axios.get("http://127.0.0.1:8000/orders/cart/", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
  
      console.log(response.data); // Log the API response
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
        calculateTotal(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };  

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Update quantity & recalculate total
  const updateQuantity = async (id, newQuantity) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/orders/cart/", 
        { food_item_id: id }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems(); // Re-fetch cart items after update
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete("http://127.0.0.1:8000/orders/cart/", {
        data: { food_item_id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems(); // Re-fetch cart items after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Handle location change
  const handleLocationChange = (e) => setLocation(e.target.value);

  // Toggle edit location mode
  const toggleEditLocation = () => {
    setIsEditingLocation((prev) => !prev);
  };

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
      {/* there's a bug pa, there's diff model for cartitems items tas orderitem??*/}
      <div className="flex flex-col gap-4 w-full mt-6">
        {cartItems.map((item) => (
          <OrderItem 
            key={item.id} 
            {...item} 
            updateQuantity={updateQuantity} 
            removeItem={removeItem} 
          />
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
            {/* Location section */}
            {isEditingLocation ? (
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                className="p-2 rounded-md border border-gray-400"
              />
            ) : (
              <p className="text-gray-800 font-semibold">{location}</p>
            )}
            <button
              onClick={toggleEditLocation}
              className="bg-[#f2d5d5] text-gray-800 text-xs font-semibold px-4 py-3 rounded-full hover:bg-primary hover:text-white"
            >
              {isEditingLocation ? "Save" : "Edit"}
            </button>
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
        <Link to="/restaurants/">
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
