import { reduxForm, SubmissionError } from 'redux-form'
import { graphql, gql } from 'react-apollo'
import { compose } from 'recompose'

import Form from 'components/form-templates/add-wallet-form'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }

  return errors
}

const onSubmit = (variables, action, { mutate, close }) => {
  mutate({
    variables,
    updateQueries: {
      wallets: (prev, { mutationResult }) => ({
        ...prev,
        wallets: [mutationResult.data.addWallet, ...prev.wallets]
      })
    }
  }).then(
    res => {
      if (!res.data.addWallet.error) close()
      else throw new SubmissionError({ _error: res.data.signIn.error })
    }
  )
}

const mutation = gql`mutation addWallet($name: String!, $USD: Float, $EUR: Float, $UAH: Float, $RUB: Float, $OTHER: Float) {
  addWallet(name: $name, USD: $USD, EUR: $EUR, UAH: $UAH, RUB: $RUB, OTHER: $OTHER)
}`

export default compose(
  graphql(mutation),
  reduxForm({
    form: 'AddWalletForm',
    validate,
    onSubmit
  })
)(Form)
