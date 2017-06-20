import React from 'react'
import AddWalletDialog from 'containers/dialogs/add-wallet-dialog'

import WalletList from 'containers/lists/wallet-list'
import LogList from 'containers/lists/log-list'
import AddLogDialog from 'containers/dialogs/add-log-dialog'

export default () => (
  <div className='page-body'>
    <div className='page-left'>
      <AddWalletDialog/>
      <WalletList/>
    </div>
    <div className='page-right'>
      <AddLogDialog/>
      <LogList/>
    </div>
  </div>
)
