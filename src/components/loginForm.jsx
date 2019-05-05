import React from 'react'
import Joi from 'joi-browser'
import { Redirect } from 'react-router-dom'
import Form from './common/form'
import auth from '../services/authService'

class LoginForm extends Form {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    }

    this.schema = {
      email: Joi.string()
        .required()
        .label('Email')
        .error(() => ({ message: 'Email is required.' })),
      password: Joi.string()
        .required()
        .label('Password')
        .error(() => ({ message: 'Password is required.' }))
    }
  }

  async doSumbit () {
    try {
      const res = await auth.login(this.state.data)
      if (res.status === 200) {
        const { state } = this.props.location
        window.location = state ? state.from.pathname : '/'
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data
        this.setState({ errors })
      }
    }
  }

  render () {
    if (auth.getCurrentUser()) return <Redirect to='/' />
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} action=''>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderBtn('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
