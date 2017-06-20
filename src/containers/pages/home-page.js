import { connect } from 'react-redux'
import { compose } from 'recompose'
import Body from 'components/page-bodies/home-body'
import 'assets/styles/account-page.less'

export default compose(
  connect(state => state.auth),
)(Body)