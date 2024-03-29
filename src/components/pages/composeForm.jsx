import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Joi from 'joi-browser'
import Form from '../common/form/form'
import formHelper from '../../utils/forms'
import SubmitButton from '../common/form/submitButton'
import InputField from '../common/form/inputField'
import FormFilters from '../common/form/formFilters'
import { sendSms } from '../../services/smsService'
import ComposeStats from '../widgets/composeStats'
import { getRecipients, getActiveFilters, getCost } from '../../utils/compose'
import splitter from 'split-sms'
import { getSubscriptions } from '../../services/subscriptionsService'
import { fetchData } from '../../utils/fetch'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
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
    .error(() => ({ message: 'Unsubscribe text is required.' })),
  fullMsg: Joi.string(),
  recipients: Joi.array()
}

const values = {
  msg: '',
  unsubMsg: 'Reply STOP to unsubscribe.'
}

const $ = process.env.REACT_APP_CURRENCY_SYMBOL
const costPerSegment = process.env.REACT_APP_COST_PER_SEGMENT

function Compose () {
  const classes = useStyles()
  const [data, setData] = useState({
    msg: '',
    unsubMsg: values.unsubMsg,
    fullMsg: '',
    recipients: []
  })
  const [filters, setFilters] = useState({})
  const [errors, setErrors] = useState({})
  const [stats, setStats] = useState({
    characters: { label: 'Characters', value: 0 },
    bytes: { label: 'Bytes', value: 0 },
    segments: { label: 'Segments', value: 1 },
    recipients: { label: 'Recipients', value: 0 },
    cost: { label: 'Est. Cost', value: '0$' }
  })
  const [subscriptions, setSubscriptions] = useState([{}])

  const doSubmit = () => {
    try {
      sendSms(data.fullMsg, data.recipients)
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

  useEffect(() => {
    fetchData(getSubscriptions, setSubscriptions)
  }, [])

  useEffect(
    () => {
      const cost = getCost(
        stats.recipients.value,
        stats.segments.value,
        costPerSegment
      )

      setStats({
        ...stats,
        cost: { ...stats.cost, value: `${cost} ${$}` }
      })
    },
    [stats]
  )

  useEffect(
    () => {
      const fullMsg = `${data.msg}\n${data.unsubMsg}`
      const smsInfo = splitter.split(fullMsg)
      const cost = getCost(
        stats.recipients.value,
        stats.segments.value,
        costPerSegment
      )

      setData({ ...data, fullMsg: fullMsg })

      setStats({
        ...stats,
        characters: { ...stats.characters, value: fullMsg.length },
        bytes: { ...stats.bytes, value: smsInfo.bytes },
        segments: { ...stats.segments, value: smsInfo.parts.length },
        cost: { ...stats.cost, value: `${cost}${$}` }
      })
    },
    [data]
  )

  useEffect(
    () => {
      const activeFilters = getActiveFilters(filters)
      const recipients = getRecipients(subscriptions, activeFilters)

      setData({ ...data, recipients: recipients })
      setStats({
        ...stats,
        recipients: { ...stats.recipients, value: recipients.length }
      })
    },
    [filters, subscriptions]
  )

  return (
    <>
      <Typography component='h1' variant='h3' gutterBottom>
        Send a SMS
      </Typography>
      <ComposeStats rows={stats} />
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
              data={subscriptions}
              onCheck={helper.handleCheck}
              onSelect={helper.handleSelect}
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
    </>
  )
}

export default Compose
