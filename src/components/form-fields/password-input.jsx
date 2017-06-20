import React from 'react'

export default ({ input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <br/>
    <input {...input} type='password'/>
    <span>{touched && error && error}</span>
  </div>
)
