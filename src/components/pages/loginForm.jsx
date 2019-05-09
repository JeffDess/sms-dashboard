import React, { useState } from 'react'
import Joi from 'joi-browser'
import { Redirect } from 'react-router-dom'
import Form from '../common/form/form'
import auth from '../../services/authService'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import formHelper from '../../utils/forms'
import InputField from '../common/form/inputField'
import SubmitButton from '../common/form/submitButton'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2)
  },
  fieldset: {
    border: 'none',
    width: '100%'
  },
  btnContainer: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    margin: theme.spacing(2)
  }
}))

function LoginForm ({ setUser }) {
  const classes = useStyles()
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const schema = {
    email: Joi.string()
      .required()
      .label('Email')
      .error(() => ({ message: 'Email is required.' })),
    password: Joi.string()
      .required()
      .label('Password')
      .error(() => ({ message: 'Password is required.' }))
  }

  async function doSubmit () {
    try {
      const res = await auth.login(data)
      if (res.status === 200) {
        setUser(auth.getCurrentUser())
        const { state } = this.props.location
        window.location = state ? state.from.pathname : '/'
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { ...errors }
        newErrors.username = ex.response.data
        this.setState({ newErrors })
      }
    }
  }

  const helper = formHelper(schema, data, doSubmit, setErrors, setData, errors)

  if (auth.getCurrentUser()) return <Redirect to='/' />

  return (
    <Paper>
      <Form
        schema={schema}
        data={data}
        setErrors={setErrors}
        doSubmit={doSubmit}
        className={classes.container}
      >
        <fieldset className={classes.fieldset}>
          <Typography component='legend' variant='h5'>
            Login
          </Typography>
          <InputField
            id='email'
            label='Email'
            placeholder='Enter your email here...'
            errors={errors}
            onChange={helper.handleChange}
          />
          <InputField
            id='password'
            label='Password'
            placeholder='Enter your password here...'
            errors={errors}
            onChange={helper.handleChange}
            type='password'
          />
        </fieldset>
        <div className={classes.btnContainer}>
          <SubmitButton onFormChange={!!helper.validate()}>Submit</SubmitButton>
        </div>
      </Form>
    </Paper>
  )
}

export default LoginForm
