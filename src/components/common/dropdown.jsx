import React from 'react'

const Dropdown = ({ name, label, options, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className='form-control'>
        <option />
        {options.map(o => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}

export default Dropdown
