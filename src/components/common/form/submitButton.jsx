import React from 'react'
import Button from '@material-ui/core/Button'

const SubmitButton = ({ onFormChange, children }) => {
  return (
    <Button
      component='button'
      variant='contained'
      color='primary'
      disabled={onFormChange}
      type='submit'
    >
      {children}
    </Button>
  )
}

export default SubmitButton
