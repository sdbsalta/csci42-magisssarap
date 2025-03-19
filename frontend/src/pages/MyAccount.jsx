import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email_address: "",
    id: "",
    contact_no: "",
    password: "",
  });

  const userId = 227407; // Replace with actual logged-in user ID or get from authentication context

  // Fetch user data from backend
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          email_address: data.email_address,
          id: data.id,
          contact_no: data.contact_no,
          password: "",
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle save changes
  const handleSave = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/user/${userId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully!");
          navigate("/account"); // Redirect to /account
        } else {
          return response.json().then((data) => {
            alert("Failed to update profile: " + JSON.stringify(data));
          });
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#fdf9f2] p-8 space-y-6">
      <h1 className="text-center text-dark text-3xl md:text-3xl">My Account👤</h1>

      {/* Tab Buttons */}
      <div className="flex w-full max-w-lg gap-x-4">
        <Link to="/account" className="flex-1">
          <button className="w-full bg-[#fee083] text-black px-6 py-3 rounded-md font-semibold cursor-not-allowed" disabled>
            Account Settings
          </button>
        </Link>
        <Link to="/account/vouchers" className="flex-1">
          <button className="w-full bg-white text-black border border-black px-6 py-3 rounded-md font-semibold hover:bg-[#fee083] hover:text-black">
            Vouchers
          </button>
        </Link>
      </div>

      {/* Input Fields */}
      <form onSubmit={handleSave} className="w-full max-w-lg flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-3 input input-bordered bg-white text-black border-black"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email_address"
            placeholder="Email"
            value={user.email_address}
            onChange={handleChange}
            className="w-full p-3 input input-bordered bg-white text-black border-black"
            required
          />
          <input
            type="text"
            placeholder="User ID"
            value={user.id}
            className="w-full p-3 border border-black rounded-md bg-gray-300 text-gray-700"
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="contact_no"
            placeholder="Contact Number"
            value={user.contact_no}
            onChange={handleChange}
            className="w-full p-3 input input-bordered bg-white text-black border-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 input input-bordered bg-white text-black border-black"
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
