import React from 'react'
import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <div className="bg-accent rounded-xl flex flex-col items-left my-5 mx-10">
        <div className="p-10">
            <h1>Contact Us 📞</h1>
            <p>Looking to offer exclusive vouchers for your restaurant or redeem your scholar discount?</p>
            <p className="py-2">Get in touch with us today!</p>
            <Link to="/">
                <button className="btn bg-secondary text-black border-0 flex-1 justify-start text-left
                hover:bg-secondary hover:text-white">Contact Us</button>
            </Link>
        </div>
    </div>
  )
}

export default ContactUs;