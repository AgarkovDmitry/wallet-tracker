import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { reduxForm, SubmissionError } from 'redux-form'
import { graphql, gql } from 'react-apollo'
import { compose, mapProps } from 'recompose'
import * as actions from 'store/actions'

import Form from 'components/form-templates/sign-in-form'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (values.email.length <= 3) {
    errors.email = 'Invalid login'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters'
  }

  return errors
}

const onSubmit = (variables, action, { mutate, handleClose }) => mutate({ variables }).then(
  res => {
    if (!res.data.signIn.error) handleClose({ ...res.data.signIn })
    else throw new SubmissionError({ _error: res.data.signIn.error })
  }
)

const mutation = gql`mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    email
    name
    token
    error
  }
}`

export default compose(
  withRouter,
  connect(state => ({ token: state.auth.token }), actions),
  graphql(mutation),
  mapProps(
    ({ history, signIn, mutate }) => ({
      handleClose: (payload) => {
        signIn(payload)
        history.push('./account')
      },
      mutate
    })
  ),
  reduxForm({
    form: 'SignInForm',
    validate,
    onSubmit
  })
)(Form)
