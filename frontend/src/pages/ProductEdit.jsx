import React from "react";

const ProductEdit = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-accent-20">
      {/* Main Content */}
      <div className="w-full max-w-3xl p-8 text-center">
        {/* Centered Heading */}
        <h2 className="text-3xl font-bold bg-yellow-200 inline-block px-4 py-2 rounded-lg">
          French Fries
        </h2>

        {/* Product Card */}
        <div className="flex flex-col items-center mt-4 p-6 bg-white rounded-lg shadow-md w-fit mx-auto">
          <div className="relative">
            <img
              src="/path/to/french-fries.png"
              alt="French Fries"
              className="w-40"
            />
            <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-full">
              ⭐ 5.0
            </div>
            <button className="absolute top-2 right-2 text-lg">❤️</button>
          </div>
          <p className="font-bold">French Fries</p>
          <p className="text-gray-500">Price: P100</p>
          <button className="btn btn-error btn-sm mt-2">Edit</button>
        </div>

        <button className="btn btn-outline mt-4">Upload Display Image</button>

        {/* Form */}
        <div className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="form-control w-full">
            <span className="label-text font-bold">Name:</span>
            <input type="text" className="input input-bordered w-full" defaultValue="French Fries" />
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text font-bold">Category:</span>
            <select className="select select-bordered w-full">
              <option>Fast Food</option>
            </select>
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text font-bold">Price:</span>
            <input type="text" className="input input-bordered w-full" defaultValue="P100" />
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text font-bold">Available:</span>
            <select className="select select-bordered w-full">
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>

          <div className="flex justify-between mt-6">
            <button className="btn btn-outline">⬅ Back</button>
            <div className="space-x-2">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
