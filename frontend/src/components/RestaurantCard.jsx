import React from "react";
import { Link } from "react-router-dom";
import Bacsilog from "../img/bacsilog.png";
import MapPin from "../icons/MapPin.svg";
import RatingIcon from "../icons/Rating.svg";

const RestaurantCard = ({ Name, Location, Rating }) => {
  return (
    <Link
      to="/restaurants/view"
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Restaurant Image */}
      <img src={Bacsilog} alt={Name} className="w-full h-40 object-cover" />

      {/* Restaurant Details */}
      <div className="p-4 relative">
        {/* Name & Location */}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">{Name}</h2>
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
