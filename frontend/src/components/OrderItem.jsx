import React from "react";
import TrashIcon from "../icons/trash.svg";

const OrderItem = ({ name, price, image, displayType = "editable" }) => {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-4 shadow-lg">
      {/* Product Image */}
      <img src={image} alt={name} className="w-14 h-14 rounded-lg bg-white p-1" />

      {/* Product Name & Price */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>{price}</p>
      </div>

      {/* Conditional Rendering Based on displayType */}
      {displayType === "editable" ? (
        <div className="flex items-center gap-2 bg-white rounded-full p-2">
          <img src={TrashIcon} alt="Delete" className="w-5 h-5 cursor-pointer" />
          <span className="text-lg font-semibold text-black">1</span>
          <button className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center font-bold">
            +
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-white rounded-full p-2">
          <h3 className="text-xs font-semibold text-black px-2">Order Quantity: 1</h3>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
