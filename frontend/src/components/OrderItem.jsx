import React from 'react';
import TrashIcon from '../icons/trash.svg';

const OrderItem = ({ 
  id, 
  name, 
  price, 
  image, 
  quantity, 
  updateQuantity, 
  removeItem, 
  isStatic = false // Determines mode
}) => {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;

  const increaseQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      removeItem(id);
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-4 shadow-lg">
      {/* Product Image */}
      <img src={image} alt={name} className="w-14 h-14 rounded-lg bg-white p-1" />

      {/* Product Name & Price */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>₱{(numericPrice * quantity).toFixed(2)}</p>
      </div>

      {/* Conditional Rendering for Modes */}
      {isStatic ? (
        // Static Mode: Show Quantity & "Add this" Button
        <div className="flex flex-col items-center">
          <p className="text-white text-sm">Quantity: {quantity}</p>
          <button className="bg-white text-red-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-200">
            Add this
          </button>
        </div>
      ) : (
        // Editable Mode: Show Quantity Controls
        <div className="flex items-center gap-2 bg-white rounded-full p-2">
          <button 
            onClick={decreaseQuantity} 
            className="w-6 h-6 text-black rounded-full flex items-center justify-center font-bold"
          >
            {quantity === 1 ? <img src={TrashIcon} alt="Delete" className="w-4 h-4" /> : '-'}
          </button>
          <span className="text-lg font-semibold text-black">{quantity}</span>
          <button 
            onClick={increaseQuantity} 
            className="w-6 h-6 text-black rounded-full flex items-center justify-center font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
