import { compose, withState, withHandlers, mapProps } from 'recompose'

import 'assets/styles/auth.less'

import Dialog from 'components/dialog'
import Body from 'components/dialog-bodies/add-wallet-body'
import Button from 'components/button'

export default compose(
  withState('isOpened', 'toggle', false),
  withHandlers({
    handleClick: ({ toggle }) => () => toggle(cur => !cur),
    handleClose: ({ toggle }) => () => toggle(false)
  }),
  mapProps(
    ({ isOpened, handleClick, handleClose }) => ({
      body: isOpened ? Body({ handleClose, className: 'auth-modal' }) : null,
      button: Button({
        handleClick,
        className: 'add-wallet-button',
        children: 'New Wallet'
      })
    })
  )
)(Dialog)
