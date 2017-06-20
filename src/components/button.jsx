import React from 'react'

export default ({ handleClick, className, disabled, children }) => (
  <button onClick={handleClick} className={className} disabled={disabled}>
    {children}
  </button>
)