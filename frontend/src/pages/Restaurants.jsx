import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../icons/search.svg";
import RestaurantCard from "../components/RestaurantCard";
import ExploreCategories from "../components/ExploreCategories";

export const Restaurants = () => {
  const restaurants = Array(4).fill({
    name: "Ate Rica’s Bacsilog",
    location: "Gonzaga Cafeteria",
    rating: 5.0,
  });

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
          className="input input-bordered bg-accent-20 text-black w-full border-black pl-10"
        />
      </div>

      {/* Explore Categories */}
      <div className="w-full mb-8"> {/* Added max-width & margin-bottom */}
        <ExploreCategories />
      </div>

      {/* Restaurant Cards Grid */}
      <div className="flex flex-col gap-6 w-full">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            Name={restaurant.name}
            Location={restaurant.location}
            Rating={restaurant.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
