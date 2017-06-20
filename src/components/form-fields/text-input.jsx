import React from 'react'

export default ({ input, label, meta: { touched, error } }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label>{label}</label>
    <input {...input} type='text'/>
    <span>{touched && error && error}</span>
  </div>
)
