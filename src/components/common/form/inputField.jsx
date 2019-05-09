import React from 'react'
import TextField from '@material-ui/core/TextField'

const InputField = ({
  id,
  label,
  errors,
  placeholder = null,
  defaultValue = null,
  type = 'text',
  onChange
}) => {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      fullWidth
      margin='normal'
      InputLabelProps={{
        shrink: true
      }}
      error={errors && !!errors[id]}
      helperText={errors && errors[id]}
      onChange={onChange}
      type={type}
    />
  )
}

export default InputField
