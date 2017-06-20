import React from 'react'

export default ({ input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <textarea {...input}/>
    <span>{touched && error && error}</span>
  </div>
)
