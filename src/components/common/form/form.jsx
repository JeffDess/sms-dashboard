import React from 'react'
import formHelper from '../../../utils/forms'

const Form = ({ schema, data, setErrors, doSubmit, children, className }) => {
  const helper = formHelper(schema, data, doSubmit, setErrors)

  return (
    <form onSubmit={helper.handleSubmit} className={className}>
      {children}
    </form>
  )
}

export default Form
