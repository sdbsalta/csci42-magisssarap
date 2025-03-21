import React from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../img/default.png"; 
import MapPin from "../icons/MapPin.svg";
import RatingIcon from "../icons/Rating.svg";

const RestaurantCard = ({ Name, Location, Rating, Image }) => {
  const formattedName = Name.toLowerCase().replace(/\s+/g, "-"); // for URL formatting


  return (
    <Link
      to={`/restaurants/${formattedName}`} 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Restaurant Image */}
      <img
        src={Image || DefaultImage} // Use the provided image or a default fallback
        alt={Name}
        className="w-full h-40 object-cover"
      />

      {/* Restaurant Details */}
      <div className="p-4 relative">
        {/* Name & Location */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{Name}</h2>
          <div className="flex items-center gap-1">
            <img src={MapPin} alt="Location" className="w-4 h-4" />
            <p>{Location}</p>
          </div>
        </div>

        {/* Rating - Positioned at the top right */}
        <div className="absolute top-4 right-4 bg-secondary text-white px-2 py-1 rounded-full flex items-center gap-1">
          <img src={RatingIcon} alt="Rating" className="w-3 h-3" />
          <p className="text-sm font-semibold">{Rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
