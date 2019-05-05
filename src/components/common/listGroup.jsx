import React from 'react'

function ListGroup ({
  groups,
  onGroupChange,
  activeGroup,
  textProp,
  valueProp
}) {
  return (
    <ul className='list-group'>
      {groups.map(g => (
        <li
          onClick={() => onGroupChange(g)}
          className={
            'clickable list-group-item' + (g === activeGroup ? ' active' : '')
          }
          key={g[valueProp] == null ? g[textProp] : g[valueProp]}
        >
          {g[textProp]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProp: 'name',
  valueProp: '_id'
}

export default ListGroup
