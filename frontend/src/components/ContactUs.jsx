import React from 'react';
import PhoneIcon from "../icons/phone.svg";

export const ContactUs = () => {
  return (
    <div className="bg-accent rounded-xl flex flex-col items-start p-10 w-full mx-auto my-5 shadow-md">
      {/* Title with Phone Icon */}
      <h1 className="text-center flex items-center gap-2 text-dark text-3xl md:text-3xl">
        Contact Us <img src={PhoneIcon} alt="Phone Icon" className="w-7 h-7" />
      </h1>

      {/* Description */}
      <p className="text-md mt-2">
        Looking to offer exclusive vouchers for your restaurant or redeem your scholar discount?
      </p>

      {/* Call to Action */}
      <p className="mt-3 font-semibold">Get in touch with us today!</p>

      {/* Contact Button */}
      <button className="mt-4 bg-secondary text-black font-semibold py-2 px-6 rounded-md shadow hover:bg-yellow-600">
        Contact Us
      </button>
    </div>
  );
};

export default ContactUs;
