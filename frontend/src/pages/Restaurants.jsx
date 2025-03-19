import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../icons/search.svg";
import RestaurantCard from "../components/RestaurantCard";
import ExploreCategories from "../components/ExploreCategories";

export const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // iniba ok ung resot para matest ung filter
  const allRestaurants = [
    { name: "Ate Rica’s Bacsilog", location: "Gonzaga Cafeteria", rating: 5.0 },
    { name: "Jollibee", location: "Katipunan Avenue", rating: 4.5 },
    { name: "McDonald's", location: "UP Town Center", rating: 4.2 },
    { name: "Mang Inasal", location: "Esteban Abada St.", rating: 4.8 },
  ];

  // filter for search
  const filteredRestaurants = allRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
          filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              Name={restaurant.name}
              Location={restaurant.location}
              Rating={restaurant.rating}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
