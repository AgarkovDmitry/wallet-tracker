import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'components/form-fields/text-input'

export default ({ error, handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        error && <div role='alert'>
          <span>{error}</span>
        </div>
      }
      <Field name="name" component={TextInput} label="Wallet title"/>
      <Field name="USD" component={TextInput} label="USD"/>
      <Field name="EUR" component={TextInput} label="EUR"/>
      <Field name="UAH" component={TextInput} label="UAH"/>
      <Field name="RUB" component={TextInput} label="RUB"/>
      <Field name="OTHER" component={TextInput} label="OTHER"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}
