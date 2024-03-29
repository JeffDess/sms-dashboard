import Joi from 'joi'

const formHelper = (
  schema,
  data,
  doSubmit,
  setErrors,
  setData,
  errors,
  filters,
  setFilters
) => {
  function validateForm (data, schema) {
    const result = Joi.validate(data, schema, {
      abortEarly: false
    })

    if (!result.error) return null

    const errors = {}
    for (let item of result.error.details) errors[item.path[0]] = item.message
    return errors
  }

  function validateProp (name, value) {
    const obj = { [name]: value }
    const newSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, newSchema)

    return error ? error.details[0].message : null
  }

  const validate = (data, schema) => ({
    validate: () => validateForm(data, schema)
  })

  const onSubmit = (data, schema, doSubmit) => ({
    handleSubmit: e => {
      e.preventDefault()

      const errors = validateForm(data, schema)
      setErrors(errors || {})
      if (errors) return
      doSubmit()
    }
  })

  const onChange = (data, setData, errors, setErrors) => ({
    handleChange: ({ currentTarget: input }) => {
      const errorMsg = validateProp(input.id, input.value)

      errorMsg
        ? setErrors({ ...errors, [input.id]: errorMsg })
        : setErrors(() => {
          delete errors[input.id]
          return errors
        })

      setData({ ...data, [input.id]: input.value })
    }
  })
  const onCheck = (filters, setFilters) => ({
    handleCheck: (filter, prop) => {
      const value = (filters[filter] && filters[filter][prop] === true) || false
      setFilters({
        ...filters,
        [filter]: { ...filters[filter], [prop]: !value }
      })
    }
  })

  const onSelect = (filters, setFilters) => ({
    handleSelect: (filter, prop) => {
      setFilters({
        ...filters,
        [filter]: prop === '' ? {} : { [prop]: true }
      })
    }
  })

  return Object.assign(
    {},
    onSubmit(data, schema, doSubmit),
    onChange(data, setData, errors, setErrors),
    onCheck(filters, setFilters),
    onSelect(filters, setFilters),
    validate(data, schema)
  )
}

export default formHelper
