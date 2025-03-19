import React, { useState } from 'react';
import TrashIcon from "../icons/trash.svg";

const OrderItem = ({ name, price, image, updateTotal }) => {
  const numericPrice = typeof price === "number" ? price : parseFloat(price) || 0;
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQty => {
      const newQty = prevQty + 1;
      updateTotal(numericPrice);
      return newQty;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => {
        const newQty = prevQty - 1;
        updateTotal(-numericPrice);
        return newQty;
      });
    }
  };

  return (
    <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-4 shadow-lg">
      {/* Product Image */}
      <img src={image} alt={name} className="w-14 h-14 rounded-lg bg-white p-1" />

      {/* Product Name & Price */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>P{numericPrice.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-white rounded-full p-2">
        <button 
          onClick={decreaseQuantity} 
          className="w-6 h-6 text-black rounded-full flex items-center justify-center font-bold"
        >
          {quantity === 1 ? <img src={TrashIcon} alt="Delete" className="w-4 h-4" /> : "-"}
        </button>
        <span className="text-lg font-semibold text-black">{quantity}</span>
        <button 
          onClick={increaseQuantity} 
          className="w-6 h-6 text-black rounded-full flex items-center justify-center font-bold"
        >+</button>
      </div>
    </div>
  );
};

export default OrderItem;
