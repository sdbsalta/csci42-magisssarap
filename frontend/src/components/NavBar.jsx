import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/MagissSarap!.svg";
import HomeIcon from "../icons/home.svg";
import SearchIcon from "../icons/search.svg";
import PhoneIcon from "../icons/phone.svg";
import LogOutIcon from "../icons/log-out.svg";
import ShoppingBagIcon from "../icons/shopping-bag.svg";
import CartIcon from "../icons/ShoppingCart.svg";
import ClipboardIcon from "../icons/clipboard.svg";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "");
  const navigate = useNavigate();

  // Listen for custom events to detect login/logout
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
      setUserType(localStorage.getItem("userType") || "");
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
        //window.dispatchEvent(new Event("authChange")); 
        //alert("You have successfully logged out!");
        navigate("/login");
      } else {
        console.error("Logout failed", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="h-screen w-48 bg-white text-black flex flex-col py-2 fixed">
      <img src={Logo} alt="Home" className="w-52 py-2" />
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

        {/* Show these links only if the user is logged in */}
        {/* Authenticated User Links */}
        {isLoggedIn && (
          <>
            {/* Customer: Only see Orders & Cart */}
            {(userType === "Customer" || userType === "Admin") && (
              <>
                <Link to="/orders/active" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
                  <img src={ShoppingBagIcon} alt="Shopping Bag" className="w-5 h-5" />
                  <span>My Orders</span>
                </Link>
                <Link to="/cart" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
                  <img src={CartIcon} alt="Cart" className="w-5 h-5" />
                  <span>Cart</span>
                </Link>
              </>
            )}

            {/* Restaurant Owner: Only see Dashboard */}
            {(userType === "Restaurant Owner" || userType === "Admin") && (
              <Link to="/dashboard" className="hover:bg-secondary-10 p-2 rounded-md flex items-center space-x-2">
                <img src={ClipboardIcon} alt="Dashboard Icon" className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            )}
          </>
        )}

        <div className="flex flex-col space-y-2">
          {/* Show login/signup only when NOT logged in */}
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="btn bg-[#ffe084] text-black border-0 flex-1 justify-start w-full text-left hover:bg-secondary hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn bg-[#fffcf9] text-black flex-1 justify-start w-full text-left hover:bg-secondary hover:text-white">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/account">
                <button className="btn bg-[#ffeaad] text-black border-0 flex-1 justify-start w-full text-left hover:bg-secondary hover:text-white">
                  My Account
                </button>
              </Link>
              <Link to ="/logout">
                <button className="btn bg-[#fffcf9] text-black flex-1 justify-start w-full text-left hover:bg-secondary hover:text-white">
                  Log Out
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
