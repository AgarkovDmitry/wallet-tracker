import React from 'react'

export default ({ input, options, label }) => (
  <div>
    <label>{label}</label>
    <select {...input}>
      <option/>
      {options.map((item, key) => <option key={key}>{item}</option>)}
    </select>
  </div>
)
