import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    contact_no: "",
    email_address: "",
    password: "",
    user_type: "Customer", // default user type
    resto_name: "",
    cuisines: [], // Initialize as empty array
    opening_time: "",
    closing_time: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentCuisines = prev.cuisines || [];
        const newCuisines = checked 
          ? [...currentCuisines, value]
          : currentCuisines.filter(cuisine => cuisine !== value);
        
        return {
          ...prev,
          cuisines: newCuisines
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 1500); // Wait 1.5 seconds to show the success message
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
            <>
              <input
                type="text"
                name="resto_name"
                placeholder="Restaurant Name"
                className="input input-bordered bg-white text-black w-full border-black"
                onChange={handleChange}
                required
              />
              <div className="w-full">
                <div className="form-control">
                  <div className="dropdown w-full">
                    <div tabIndex={0} role="button" className="btn btn-outline w-full border-black bg-white text-black hover:bg-gray-100 min-h-[3rem] py-2 h-auto">
                      {formData.cuisines.length > 0 ? (
                        <div className="flex flex-wrap gap-2 w-full">
                          {formData.cuisines.map((cuisine) => (
                            <div key={cuisine} className="badge badge-lg bg-[#ffe084] text-black flex items-center gap-1 px-3 py-1">
                              {cuisine}
                              <button
                                type="button"
                                className="btn btn-sm btn-ghost btn-circle p-0 h-5 min-h-0 w-5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData(prev => ({
                                    ...prev,
                                    cuisines: prev.cuisines.filter(c => c !== cuisine)
                                  }));
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">Select Cuisines</span>
                      )}
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-full border border-black">
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Breakfast')
                              ? formData.cuisines.filter(c => c !== 'Breakfast')
                              : [...formData.cuisines, 'Breakfast'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Breakfast
                        </button>
                      </li>
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Lunch')
                              ? formData.cuisines.filter(c => c !== 'Lunch')
                              : [...formData.cuisines, 'Lunch'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Lunch
                        </button>
                      </li>
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Dinner')
                              ? formData.cuisines.filter(c => c !== 'Dinner')
                              : [...formData.cuisines, 'Dinner'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Dinner
                        </button>
                      </li>
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Chicken')
                              ? formData.cuisines.filter(c => c !== 'Chicken')
                              : [...formData.cuisines, 'Chicken'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Chicken
                        </button>
                      </li>
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Salad')
                              ? formData.cuisines.filter(c => c !== 'Salad')
                              : [...formData.cuisines, 'Salad'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Salad
                        </button>
                      </li>
                      <li>
                        <button 
                          type="button"
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            const newCuisines = formData.cuisines.includes('Pasta')
                              ? formData.cuisines.filter(c => c !== 'Pasta')
                              : [...formData.cuisines, 'Pasta'];
                            setFormData(prev => ({ ...prev, cuisines: newCuisines }));
                          }}
                        >
                          Pasta
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative flex flex-col">
                  <input
                    type="time"
                    name="opening_time"
                    className="input input-bordered bg-white text-black w-full border-black [&::-webkit-calendar-picker-indicator]:opacity-100 [&:not(:valid)_::-webkit-datetime-edit]:text-transparent"
                    onChange={handleChange}
                    required
                    step="900"
                    value={formData.opening_time || ""}
                  />
                  <span className="text-white text-xs mt-1 text-center">Opening Time</span>
                </div>
                <div className="relative flex flex-col">
                  <input
                    type="time"
                    name="closing_time"
                    className="input input-bordered bg-white text-black w-full border-black [&::-webkit-calendar-picker-indicator]:opacity-100 [&:not(:valid)_::-webkit-datetime-edit]:text-transparent"
                    onChange={handleChange}
                    required
                    step="900"
                    value={formData.closing_time || ""}
                  />
                  <span className="text-white text-xs mt-1 text-center">Closing Time</span>
                </div>
              </div>
            </>
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
