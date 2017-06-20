import React from 'react'
import AuthDialog from 'containers/dialogs/auth-dialog'
import SignOutButton from 'containers/buttons/sign-out-button'

export default ({ token }) => (
  <header>
    <div className='page-wrapper'>
      <div className='header-left'>
        <div className='header-title'>
          Wallet-tracker
        </div>
      </div>
      <div className='header-right'>
        {
          token
          ? <SignOutButton> Sign Out </SignOutButton>
          : <AuthDialog/>
        }
      </div>
    </div>
  </header>
)

