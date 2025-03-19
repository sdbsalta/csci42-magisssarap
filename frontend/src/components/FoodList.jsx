import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodItem from "./FoodItem";

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/food-items/")
      .then(response => {
        console.log("Fetched data:", response.data); // ✅ Check if data is retrieved
        setFoodItems(response.data);
      })
      .catch(error => console.error("Error fetching food items:", error));
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {foodItems.length === 0 && <p>No food items found.</p>}  
      {foodItems.map(food => (
        <FoodItem 
          key={food.id}
          FoodName={food.description}
          Price={`₱${food.price}`}
          Location={food.restaurant}
          Rating="4.5"
        />
      ))}
    </div>
  );
};

export default FoodList;