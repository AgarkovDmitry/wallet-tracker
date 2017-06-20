import React from 'react'
import Button from 'containers/buttons/delete-wallet-button'

export default ({ wallet, money, id, itemClass, select }) => (
  <div onClick={select} className={itemClass}>
    <div className='wallet-item-left'>
      <div>{wallet.title}</div>
      <div>{wallet.createDate}</div>
      <div>{money}</div>
    </div>
    <div className='wallet-item-right'>
      <Button id={id}>
        Remove
      </Button>
    </div>
  </div>
)
