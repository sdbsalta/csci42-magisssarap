import React from 'react'

export const FAQs = () => {
  return (
    <div className="bg-primary-10 rounded-xl flex flex-col items-center mx-auto my-5 shadow-md">
        <div className="px-5 py-7">
            <h1 className="text-center text-2xl">Frequently Asked Questions (FAQs)</h1>
            <div className="flex justify-center">
                <div className="rounded-xl bg-primary-40 m-5 text-white p-5">
                    {/* item 1 */}
                    <div className="collapse collapse-arrow w-full">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            Click to expand
                        </div>
                        <div className="collapse-content">
                            <p>Accordion content goes here.</p>
                        </div>
                    </div>

                    {/* item 2 */}
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            help me help me help me help me help me help me help me help me help me
                        </div>
                        <div className="collapse-content">
                            <p>Accordion content goes here.</p>
                        </div>
                    </div>

                    {/* item 3 */}
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium w-full">
                            Click to expand
                        </div>
                        <div className="collapse-content">
                            <p>Accordion content goes here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FAQs;