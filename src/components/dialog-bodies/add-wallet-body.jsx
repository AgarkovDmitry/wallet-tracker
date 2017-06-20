import React from 'react'

import AddWalletForm from 'containers/forms/add-wallet-form'

export default ({ handleClose, className }) => (
  <div onClick={handleClose} className='modal'>
    <div className={className} onClick={e => e.stopPropagation()}>
      <AddWalletForm close={handleClose}/>
    </div>
  </div>
)

