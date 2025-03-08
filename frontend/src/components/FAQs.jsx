import React from 'react'

export const FAQs = () => {
  return (
    <div className="bg-primary-10 rounded-xl flex flex-col items-center mx-auto my-5 shadow-lg">
        <div className="px-5 py-7">
            <h1 className="text-center text-dark text-3xl md:text-3xl">Frequently Asked Questions (FAQs)</h1>
            <div className="flex justify-center">
                <div className="rounded-xl bg-primary-40 m-5 text-white p-5">
                    {/* item 1 */}
                    <div className="collapse collapse-arrow w-full">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            How do I place an order on MagissSarap?
                        </div>
                        <div className="collapse-content">
                            <p>Simply browse the available restaurants, select your preferred meals, and proceed to checkout. 
                                You'll receive updates on your order status once confirmed.</p>
                        </div>
                    </div>

                    {/* item 2 */}
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            Can I use MagissSarap! if I'm not a student or staff member?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Currently, MagissSarap! is designed for Ateneo students and staff to facilitate campus food deliveries.
                            </p>
                        </div>
                    </div>

                    {/* item 3 */}
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            What restaurants are available on MagissSarap?
                        </div>
                        <div className="collapse-content">
                            <p>MagissSarap! features a database of all dining establishments within the Ateneo campus, including cafeterias, food stalls, and partner vendors.</p>
                        </div>
                    </div>

                    {/* item 4 */}
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            Is MagissSarap! available as a mobile app??
                        </div>
                        <div className="collapse-content">
                            <p>Currently, MagissSarap! is a web-based platform, but we are working on making it more mobile-friendly for better accessibility.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FAQs;