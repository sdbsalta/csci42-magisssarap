import React from 'react'
import { Link } from "react-router-dom";
import BackIcon from "../icons/back.svg";
import CampusMapPic from "../img/campusmap.png";

export default function CampusMap() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-accent p-4">
        <h1 className="text-3xl font-bold text-black">Ateneo Map</h1>
        <div className="w-full flex justify-center p-4">
            <img src={CampusMapPic} alt="Campus Map" className="w-full h-auto rounded-lg" />
        </div>
        <div className="w-full flex justify-start p-4">
            <Link to="/restaurants">
                <img src={BackIcon} alt="Back Icon" className="w-14 h-14" />
            </Link>
        </div>
    </div>
  )
}