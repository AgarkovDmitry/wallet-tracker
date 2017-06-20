import { connect } from 'react-redux'
import { compose, branch, renderComponent } from 'recompose'
import Body from 'components/page-bodies/account-body'

import 'assets/styles/account-page.less'

import TokenError from 'components/exceptions/token-error'

export default compose(
  connect(state => state.auth),
  branch(
    ({ token }) => !token,
    renderComponent(TokenError)
  )
)(Body)