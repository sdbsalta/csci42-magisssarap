import React from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/MagissSarap!.svg";
import HomeIcon from "../icons/home.svg";
import SearchIcon from "../icons/search.svg";
import PhoneIcon from "../icons/phone.svg";
import UserIcon from "../icons/UserCirclePlus.svg";
import LogOutIcon from "../icons/log-out.svg";
import ShoppingBagIcon from "../icons/shopping-bag.svg";
import CartIcon from "../icons/ShoppingCart.svg";
import ClipboardIcon from "../icons/clipboard.svg";

const NavBar = () => {
  return (
    <div className="h-screen w-48 bg-white text-black flex flex-col py-2 fixed">
      <img src={Logo} alt="Home" className="w-52" />
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={HomeIcon} alt="Home" className="w-5 h-5" />
            <span>Home</span>
        </Link>
        <Link to="/restaurants" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={SearchIcon} alt="Search Icon" className="w-5 h-5" />
            <span>Search Restaurants</span>
        </Link>
        <Link to="/contact" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={PhoneIcon} alt="Phone Icon" className="w-5 h-5" />
            <span>Contact Us + FAQs</span>
        </Link>
        
        {/* logged out */}
        <Link to="/merchant" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={UserIcon} alt="User Icon" className="w-5 h-5" />
            <span>Sign Up as a Merchant</span>
        </Link>

        {/* user */}
        <Link to="/cart" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={ShoppingBagIcon} alt="Shopping Bag" className="w-5 h-5" />
            <span>My Orders</span>
        </Link>
        <Link to="/cart" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={CartIcon} alt="Cart" className="w-5 h-5" />
            <span>Cart</span>
        </Link>

         {/* owner */}
         <Link to="/dashboard" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
            <img src={ClipboardIcon} alt="Clipboard Icon" className="w-5 h-5" />
            <span>Dashboard</span>
        </Link>

        <div className="flex flex-col space-y-2">
            {/* logged out */}
            <Link to="/login">
            <button className="btn bg-[#ffe084] text-black border-0 flex-1 justify-start w-full text-left
              hover:bg-secondary hover:text-white">Login</button>
            </Link>
            <Link to="/signup">
            <button className="btn bg-[#fffcf9] text-black flex-1 justify-start w-full text-left
              hover:bg-secondary hover:text-white">Sign Up</button>
            </Link>

            {/* user */}
            <Link to="account">
            <button className="btn bg-[#ffeaad] text-black border-0 flex-1 justify-start w-full text-left
              hover:bg-secondary hover:text-white">My Account</button>
            </Link>
            <Link>
            <button className="btn bg-[#fffcf9] text-black flex-1 justify-start w-full text-left
              hover:bg-secondary hover:text-white">Log Out</button>
             </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
