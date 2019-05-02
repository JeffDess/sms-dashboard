import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Dropdown from './dropdown'

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    })

    if (!result.error) return null

    const errors = {}
    for (let item of result.error.details) errors[item.path[0]] = item.message
    return errors
  }

  validateProp = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)

    return error ? error.details[0].message : null
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return
    this.doSumbit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMsg = this.validateProp(input)
    if (errorMsg) errors[input.name] = errorMsg
    else delete errors[input.name]

    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data, errors })
  }

  renderInput (name, label, type = 'text') {
    const { data, errors } = this.state
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    )
  }

  renderDropdown (name, label, options) {
    const { data, errors } = this.state
    return (
      <Dropdown
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    )
  }

  renderBtn (label) {
    return (
      <button className='btn btn-primary' disabled={this.validate()}>
        {label}
      </button>
    )
  }
}

export default Form
