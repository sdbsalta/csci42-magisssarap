import React from 'react'

export const FAQs = () => {
  return (
    <div className="w-80">
        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
            Click to expand
            </div>
            <div className="collapse-content">
            <p>Accordion content goes here.</p>
            </div>
        </div>
    </div>
  )
}

export default FAQs;