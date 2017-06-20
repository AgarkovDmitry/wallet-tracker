import { connect } from 'react-redux'
import { compose } from 'recompose'

import Header from 'components/header'

export default compose(
  connect(state => ({ token: state.auth.token })),
)(Header)

