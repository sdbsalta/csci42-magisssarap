import React from 'react'
import FAQs from '../components/FAQs';
import ContactUs from '../components/ContactUs';

export const ContactFAQs = () => {
  return (
    <div className="w-full rounded-md bg-accent-20 min-h-screen py-1">
      <ContactUs />
      <FAQs />
    </div>
  )
}

export default ContactFAQs;