import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'components/form-fields/text-input'
import PasswordInput from 'components/form-fields/password-input'

export default ({ error, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        error && <div role='alert'>
          <span>{error}</span>
        </div>
      }
      <Field name='email' component={TextInput} label='Email'/>
      <Field name='password' component={PasswordInput} label='Password'/>

      <button type='submit'>Next</button>
    </form>
  )
}
