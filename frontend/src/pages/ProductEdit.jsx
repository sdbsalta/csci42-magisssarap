import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "../icons/back.svg";
import PicPreview from "../img/picpreview.png";

const ProductEdit = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fdf8f4] p-8 w-full relative">
      <h1 className="text-dark text-3xl md:text-3xl font-semibold bg-secondary-20 px-5 py-2 rounded-xl">
        French Fries
      </h1>
      <img
        src={PicPreview}
        alt="French Fries Preview"
        className="w-64 h-64 object-contain mt-4"
      />
      <button className="bg-red-200 text-gray-800 px-4 py-2 mt-4 rounded-full font-semibold hover:bg-primary transition hover:text-white">
        Upload Display Image
      </button>
      <div className="mt-6 w-[320px] space-y-4">
        <input
          type="text"
          placeholder="Name: French Fries"
          className="w-full p-3 input input-bordered bg-white text-black border-black rounded-lg"
        />
        <select className="input-bordered bg-white text-black border-black px-3 py-2 rounded-lg w-full border text-gray-500">
          <option disabled selected>Category: Fast Food</option>
          <option className="text-black">Fast Food</option>
          <option className="text-black">Snacks</option>
          <option className="text-black">Meals</option>
          <option className="text-black">Beverages</option>
        </select>
        <input
          type="text"
          placeholder="Price: P100"
          className="w-full p-3 input input-bordered bg-white text-black border-black rounded-lg"
        />
        <select className="input-bordered bg-white text-black border-black px-3 py-2 rounded-lg w-full border text-gray-500">
          <option disabled selected>Available: Yes</option>
          <option className="text-black">Yes</option>
          <option className="text-black">No</option>
        </select>
      </div>
      <div className="flex gap-4 mt-6 mb-12">
        <Link to="/menu/edit">
          <button className="border border-black px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
            Cancel
          </button>
        </Link>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:border hover:border-black hover:bg-green-600 transition">
          Save
        </button>
      </div>
      <Link to="/menu/edit" className="absolute left-6 bottom-4">
        <img
          src={BackIcon}
          alt="Back"
          className="w-12 h-12 hover:scale-110 transition-transform"
        />
      </Link>
    </div>
  );
};

export default ProductEdit;
