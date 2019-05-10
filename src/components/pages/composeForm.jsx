import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Joi from 'joi-browser'
import Form from '../common/form/form'
import formHelper from '../../utils/forms'
import SubmitButton from '../common/form/submitButton'
import InputField from '../common/form/inputField'
import FormFilters from '../common/form/formFilters'
import db from '../../db.json'

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

const schema = {
  msg: Joi.string()
    .required()
    .label('Message')
    .error(() => ({ message: 'Message is required.' })),
  unsubMsg: Joi.string()
    .required()
    .label('Unsubscribe text')
    .error(() => ({ message: 'Unsubscribe text is required.' }))
}

const values = {
  msg: '',
  unsubMsg: 'Reply STOP to unsubscribe.'
}

function Compose () {
  const classes = useStyles()
  const [data, setData] = useState({ msg: '', unsubMsg: values.unsubMsg })
  const [filters, setFilters] = useState({
    country: {
      Canada: false,
      France: false,
      Brazil: false
    },
    list: { prospects: false, customers: false, employees: false }
  })
  const [errors, setErrors] = useState({})

  const doSubmit = () => {
    try {
      // TODO Implement backend call
      console.log(`Submitted message:\n${data.msg}\n${data.unsubMsg}`)
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { ...errors }
        newErrors.msg = ex.response.data
        setErrors(errors)
      }
    }
  }

  const helper = formHelper(
    schema,
    data,
    doSubmit,
    setErrors,
    setData,
    errors,
    filters,
    setFilters
  )

  return (
    <React.Fragment>
      <Typography component='h1' variant='h3' gutterBottom>
        Send a SMS
      </Typography>
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
              Filters
            </Typography>
            <FormFilters
              data={db.subscriptions}
              onChange={helper.handleCheck}
              filters={filters}
            />
          </fieldset>
          <fieldset className={classes.fieldset}>
            <Typography component='legend' variant='h5'>
              Content
            </Typography>
            <InputField
              id='msg'
              label='Message'
              placeholder='📝 Write your message here...'
              errors={errors}
              onChange={helper.handleChange}
            />
            <InputField
              id='unsubMsg'
              label='Unsubscribe text'
              defaultValue={values.unsubMsg}
              errors={errors}
              onChange={helper.handleChange}
            />
          </fieldset>
          <div className={classes.btnContainer}>
            <SubmitButton onFormChange={!!helper.validate()}>Send</SubmitButton>
          </div>
        </Form>
      </Paper>
    </React.Fragment>
  )
}

export default Compose
