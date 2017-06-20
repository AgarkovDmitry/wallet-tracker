import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose, withState, withHandlers, branch, renderNothing, mapProps } from 'recompose'

import 'assets/styles/auth.less'

import Dialog from 'components/dialog'
import Body from 'components/dialog-bodies/add-log-body'
import Button from 'components/button'

export default compose(
  withRouter,
  connect(state => ({ ...state.account })),
  withState('isOpened', 'toggle', false),
  withHandlers({
    handleClick: ({ toggle }) => () => toggle(cur => !cur),
    handleClose: ({ toggle }) => () => toggle(false)
  }),
  branch(
    ({ wallet }) => !wallet,
    renderNothing
  ),
  mapProps(
    ({ handleClose, isOpened, handleClick }) => ({
      body: isOpened ? Body({ handleClose, className: 'auth-modal' }) : null,
      button: Button({
        handleClick,
        className: 'add-log-button',
        children: 'New Wallet'
      })
    })
  )
)(Dialog)
