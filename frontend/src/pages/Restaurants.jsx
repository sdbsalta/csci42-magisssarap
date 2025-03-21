import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../icons/search.svg";
import RestaurantCard from "../components/RestaurantCard";
import ExploreCategories from "../components/ExploreCategories";

export const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  // get restaurants from django backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/restaurants/", {
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);  

  // Filter for search
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.resto_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-accent-20 p-8 w-full">
      {/* Search Section */}
      <div className="relative w-full mb-6">
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered bg-accent-20 text-black w-full border-black pl-10"
        />
      </div>

      {/* Explore Categories */}
      <div className="w-full mb-8">
        <ExploreCategories />
      </div>

      {/* Restaurant Cards Grid */}
      <div className="flex flex-col gap-6 w-full">
        {filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-600">No restaurants found.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.resto_id}
              Name={restaurant.resto_name}
              Location={restaurant.location}
              Rating={restaurant.rating || "N/A"}
              Image={restaurant.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
