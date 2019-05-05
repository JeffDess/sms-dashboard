import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import { saveUser } from '../services/userService'
import auth from '../services/authService'

class UserForm extends Form {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        username: '',
        password: ''
      },
      errors: {}
    }

    this.schema = {
      name: Joi.string()
        .label('Name')
        .required()
        .error(() => ({ message: 'Name is required.' })),
      username: Joi.string()
        .required()
        .label('Username')
        .error(() => ({ message: 'Username is required.' }))
        .email()
        .error(() => ({ message: 'Username must be a valid email.' })),
      password: Joi.string()
        .required()
        .label('Password')
        .error(() => ({ message: 'Password is required.' }))
        .min(5)
        .error(() => ({
          message: 'Password must be at least 5 characters long.'
        }))
    }
  }

  async doSumbit () {
    try {
      const res = await saveUser(this.state.data)
      if (res.status === 200) {
        const jwt = res.headers['x-auth-token']
        auth.loginWithJwt(jwt)
        window.location = '/'
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
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} action=''>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderBtn('Login')}
        </form>
      </div>
    )
  }
}

export default UserForm
