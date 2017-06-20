import React from 'react'

export default ({ items, ItemComponent, listClassName, index, setIndex, pages }) => (
  <div className={listClassName}>
  {
    items.map(
      (item, key) => <ItemComponent key={key} item={item}/>
    )
  }
  {
    index != undefined && <div className='pagination'>
      {index > 0 && <div className='pagination-item' onClick={() => setIndex(0)}>1</div>}
      <div className='pagination-selected-item'>{index + 1}</div>
      {index < pages - 1 && <div className='pagination-item' onClick={() => setIndex(pages - 1)}>{pages}</div>}
    </div>
  }
  </div>
)