import React, { useState } from "react";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    contact_no: "",
    email_address: "",
    password: "",
    user_type: "Customer", // default user type
    resto_name: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      formData.user_type === "Customer"
        ? "http://127.0.0.1:8000/signup/"
        : "http://127.0.0.1:8000/api/register_restaurant_owner/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
        <h1 className="text-center text-white text-3xl md:text-3xl mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <input
            type="text"
            name="user_id"
            placeholder="Ateneo Student ID"
            className="input input-bordered bg-white text-black w-full border-black"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered bg-white text-black w-full border-black"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact_no"
            placeholder="Contact Number"
            className="input input-bordered bg-white text-black w-full border-black"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email_address"
            placeholder="Ateneo Email"
            className="input input-bordered bg-white text-black w-full border-black"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered bg-white text-black w-full border-black"
            onChange={handleChange}
            required
          />
          
          <select
            name="user_type"
            className="select select-bordered w-full border-black"
            onChange={handleChange}
          >
            <option value="Customer">Customer</option>
            <option value="Restaurant Owner">Restaurant Owner</option>
          </select>

          {formData.user_type === "Restaurant Owner" && (
            <input
              type="text"
              name="resto_name"
              placeholder="Restaurant Name"
              className="input input-bordered bg-white text-black w-full border-black"
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="btn bg-[#ffe084] text-black border-0 mt-4 w-full hover:bg-[#fffcf9]">
            Continue
          </button>

          {message && <p className="text-white mt-3">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
