import React from 'react'
import Checkboxes from './checkboxes'
import withHeaders from '../../withHeaders'
import Selects from './selects'

function FormFilter ({ headers, data, filters, onCheck, onSelect }) {
  const selectedFilters =
    process.env.REACT_APP_DISTRIBUTION_FILTERS.split(',') || headers

  const filterFields = headers.filter(h =>
    selectedFilters.some(c => c === h.id)
  )

  return filterFields.map(f => {
    const options = [
      ...new Set(
        data
          .filter(d => !!d[f.id])
          .map(p => p[f.id])
          .sort()
      )
    ]

    if (f.id !== 'country') {
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
    } else {
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
    }
  })
}

export default withHeaders(FormFilter)
