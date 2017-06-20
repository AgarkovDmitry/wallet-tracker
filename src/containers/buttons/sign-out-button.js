import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose, mapProps } from 'recompose'
import * as actions from 'store/actions'

export default compose(
  withRouter,
  connect(state => ({ token: state.auth.token }), actions),
  mapProps(
    ({ history, signOut, children }) => ({
      onClick: () => {
        signOut()
        history.push('/')
      },
      className: 'header-button',
      children
    })
  )
)('button')

