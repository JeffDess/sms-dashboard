import React from 'react'

const Searchbar = ({ value, onChange }) => {
  return (
    <form action=''>
      <input
        type='text'
        name='search'
        placeholder='Search...'
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </form>
  )
}

export default Searchbar
