import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { graphql, gql } from 'react-apollo'
import { compose } from 'recompose'

import Form from 'components/form-templates/add-log-form'

const query = gql`query wallet ($wallet: ID!){
  wallet(_id: $wallet) {
    title,
    createDate,
    updateDate,
    USD,
    EUR,
    UAH,
    RUB,
    OTHER
  }
}`

const mutation = gql`mutation addLog($currency: String!, $amount: Float!, $type: String!, $wallet: ID!, $comment: String) {
  addLog(currency: $currency, amount: $amount, type: $type, wallet: $wallet, comment: $comment)
}`

const validate = values => {
  const errors = {}
  if (!values.type) {
    errors.type = 'Required'
  }

  return errors
}

const onSubmit = (variables, action, { mutate, close, wallet }) => {
  mutate({
    variables: {
      ...variables,
      wallet
    },
    updateQueries: {
      logs: (prev, { mutationResult }) => ({
        ...prev,
        logs: [mutationResult.data.addLog, ...prev.logs]
      })
    },
    refetchQueries: [{
      query,
      variables: { wallet }
    }]
  }).then(
    res => {
      if (!res.data.addLog.error) close()
      else throw new SubmissionError({ _error: res.data.addLog.error })
    }
  )
}

export default compose(
  connect(state => ({ ...state.account })),
  graphql(mutation),
  reduxForm({
    form: 'AddLogForm',
    validate,
    onSubmit
  })
)(Form)
