import React from "react";
import { Link } from "react-router-dom";
import Fruits from "../img/fruit.png";
import SeaFood from "../img/seafood.png";
import Rice from "../img/ricemeal.png";
import Chicken from "../img/chicken.png";
import Salad from "../img/salads.png";
import Pasta from "../img/pasta.png";

const ExploreCategories = () => {
  const categories = [
    { name: "Fruits", pic: Fruits, link: "/category/fruits" },
    { name: "Sea Food", pic: SeaFood, link: "/category/seafood" },
    { name: "Rice Meals", pic: Rice, link: "/category/rice-meals" },
    { name: "Chicken", pic: Chicken, link: "/category/chicken" },
    { name: "Salad", pic: Salad, link: "/category/salad" },
    { name: "Pasta", pic: Pasta, link: "/category/pasta" },
  ];

  return (
    <div className="bg-primary-50 p-5 rounded-2xl flex flex-col items-center shadow-md">
      <h1 className="text-white text-3xl md:text-3xl mb-4">Explore Categories</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="flex flex-col items-center overflow-hidden cursor-pointer transition-transform transform hover:scale-105 p-3 flex flex-col items-center w-24 md:w-32"
          >
            <div className="bg-white rounded-3xl p-3 shadow-lg w-24 md:w-32 flex items-center justify-center">
              <img
                src={category.pic}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <p className="text-white text-sm font-semibold mt-2">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategories;
