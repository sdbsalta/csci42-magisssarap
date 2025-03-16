import React from 'react'
import { Link } from "react-router-dom";
import HeroBanner from "../img/homepage-herobanner.png";
import FoodItem from "../components/FoodItem";
import FoodList from "../components/FoodList"
import FAQs from "../components/FAQs";
import ContactUs from "../components/ContactUs";
import ExploreCategories from "../components/ExploreCategories";

export const Home = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md p-8 bg-accent-20">
        {/* hero banner */}
        <div className="flex flex-col md:flex-row bg-primary p-5 rounded-2xl items-center gap-3 shadow-lg">
        <div className="text-white flex-1 text-center md:text-left">
            <h1 className="text-dark text-semibold text-4xl md:text-3xl">
                Bringing Campus Dining to Your Fingertips
            </h1>
            <h2 className="py-2">Order. Track. Enjoy. Say goodbye to long queues and hello to convenience.</h2>
            <div className="flex w-full gap-3 justify-center md:justify-start">
                <Link to="/restaurants">
                    <button className="btn bg-white text-black rounded-md shadow py-1 px-4 flex-1 hover:bg-primary hover:text-white hover:border-white">
                        Explore Menus
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="btn bg-primary text-white rounded-md shadow py-1 px-4 flex-1 hover:bg-white hover:text-black leading-5">Sign Up Now</button>
                </Link>
            </div>
        </div>

        <img src={HeroBanner} alt="Gonzaga Cafeteria" className="w-full max-w-sm md:w-1/2 object-cover rounded-xl mt-5 md:mt-0" />
        </div>

        {/* food you'll love */}
        <div className="">
            <h1 className="text-dark text-3xl md:text-3xl">Food You’ll Love 👀</h1>
            <div className="flex flex-row gap-5 text-sm text-black-40 font-semibold">
                <Link to="/recommended" className="hover:text-primary">Recommended</Link>
                {/* iya: separate hyperlink pa ba o filter nalang? mas maganda filter-jervie*/}
                <Link to="/popular-restaurants" className="hover:text-primary">Popular Restaurants</Link>
                <Link to="/gonzaga-cafeteria" className="hover:text-primary">Gonzaga Cafeteria</Link>
                <Link to="/jsec" className="hover:text-primary">JSEC</Link>
            </div>
            <div className="flex flex-row py-2 gap-3">
            <FoodList />
            </div>
        </div>

        {/* Explore Categories */}
        <ExploreCategories />
        
        {/* how it works */}
        <div className="flex flex-col rounded-2xl bg-secondary-20 p-8 gap-y-3 shadow-lg mt-4">
            <h1 className="px-2 text-dark text-3xl md:text-3xl">How it Works 🤔</h1>
            {/* 1 */}
            <div className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-10 text-white font-bold">
                    <h1 className="text-black">1</h1>
                </div>
                <p className="text-white">Create an account</p>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-10 text-white font-bold">
                    <h1 className="text-black">2</h1>
                </div>
                <p className="text-white">Browse restaurants</p>
            </div>

             {/* 3 */}
             <div className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-10 text-white font-bold">
                    <h1 className="text-black">3</h1>
                </div>
                <p className="text-white">Add food items to the cart</p>
            </div>

             {/* 4 */}
             <div className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-10 text-white font-bold">
                    <h1 className="text-black">4</h1>
                </div>
                <p className="text-white">Select delivery mode</p>
            </div>

            {/* 5 */}
            <div className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-10 text-white font-bold">
                    <h1 className="text-black">5</h1>
                </div>
                <p className="text-white">Wait for your order at the chosen location</p>
            </div>
        </div>


        {/* faqs + contacts */}
        <div className="flex flex-row gap-8"> 
            <FAQs />
            <ContactUs />
        </div>
    </div>
  )
}

export default Home;