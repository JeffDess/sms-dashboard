import React from 'react'
import Checkboxes from './checkboxes'
import Selects from './selects'
import { orderByProp } from '../../../utils/sort'
import { generateHeaders } from '../../../utils/tables'

function FormFilter ({ data, filters, onCheck, onSelect }) {
  const headers = generateHeaders(data)
  const selectedFilters =
    JSON.parse(process.env.REACT_APP_DISTRIBUTION_FILTERS) || headers
  const filterFields = headers.filter(h =>
    selectedFilters.some(c => c.id === h.id)
  )

  filterFields.forEach(x => {
    x.type = selectedFilters.find(s => s.id === x.id).type || 'select'
    x.order = selectedFilters.find(s => s.id === x.id).order || null
  })

  return orderByProp(filterFields, 'order').map(f => {
    const options = [
      ...new Set(
        data
          .filter(d => !!d[f.id])
          .map(p => p[f.id])
          .sort()
      )
    ]

    switch (f.type) {
      case 'checkbox':
        return (
          <Checkboxes
            key={f.id}
            listId={f.id}
            label={f.label}
            filters={filters}
            options={options}
            onCheck={onCheck}
          />
        )
      case 'select':
        return (
          <Selects
            key={f.id}
            listId={f.id}
            label={f.label}
            filters={filters}
            options={options}
            onSelect={onSelect}
          />
        )
      default:
        return null
    }
  })
}

export default FormFilter
