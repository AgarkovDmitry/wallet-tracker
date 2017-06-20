import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'components/form-fields/text-input'
import TextArea from 'components/form-fields/text-area'
import Select from 'components/form-fields/select'

export default ({ error, handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        error && <div role='alert'>
          <span>{error}</span>
        </div>
      }
      <Field name="type" component={Select} label="Type" options={[
        'Expense',
        'Income',
        'Transfer'
      ]}/>
      <Field name="amount" component={TextInput} label="Amount"/>
      <Field name="currency" component={Select} label="Currency" options={[
        'USD',
        'EUR',
        'UAH',
        'RUB',
        'OTHER'
      ]}/>
      <Field name="comment" component={TextArea} label="Comment"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}
