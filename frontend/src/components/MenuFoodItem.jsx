import React from 'react';
import RatingIcon from '../icons/Rating.svg'; 
import Bacsilog from '../img/bacsilog.png';

export const MenuFoodItem = ({ FoodName, Price, Rating }) => {
  return (
    <div className="bg-secondary-10 p-4 rounded-lg flex flex-col items-center w-52 h-52">
        {/* rating */}
        <div className="bg-secondary text-white px-2 py-1 rounded-full flex items-center gap-2 self-start">
            <img src={RatingIcon} alt="Rating" className="w-3 h-3" />
            <p className="text-sm font-semibold">{Rating}</p>
        </div>

      {/* img */}
      <img src={Bacsilog} alt={FoodName} className="w-20 h-20 rounded-md my-2" />

      {/* name / price / loc */}
      <div className="flex flex-col text-left text-sm">
        <p className="font-bold">{FoodName}</p>
        
        <div className="flex justify-between">
        <p>{Price}</p>  
        </div>
      </div>
    </div>
  );
};

export default MenuFoodItem;