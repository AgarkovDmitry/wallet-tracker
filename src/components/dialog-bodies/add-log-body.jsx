import React from 'react'

import AddLogForm from 'containers/forms/add-log-form'

export default ({ handleClose, className }) => (
  <div onClick={handleClose} className='modal'>
    <div className={className} onClick={e => e.stopPropagation()}>
      <AddLogForm close={handleClose}/>
    </div>
  </div>
)

