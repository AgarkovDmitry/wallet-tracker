import React from 'react'

export default ({ log }) => {
  return (
    <div className='log-item'>
      <div className={`log-item-type-${log.type.toLowerCase()}`}>{log.type}</div>
      <div className='log-item-amount'>{log.amount}</div>
      <div className='log-item-currency'>{log.currency}</div>
      <div className='log-item-right'>{log.date}</div>
      {
        log.comment
        ? <div className='log-item-comment'>{log.comment}</div>
        : null
      }
    </div>
  )
}
