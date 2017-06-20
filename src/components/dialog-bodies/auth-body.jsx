import React from 'react'

import SingInForm from 'containers/forms/sign-in-form'

export default ({ handleClose, className }) => (
  <div onClick={handleClose} className='modal'>
    <div className={className} onClick={e => e.stopPropagation()}>
      <SingInForm/>
    </div>
  </div>
)

