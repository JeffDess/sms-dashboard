import React from 'react'
import Checkboxes from './checkboxes'
import withHeaders from '../../withHeaders'

function FormFilter ({ headers, data, filters, onChange }) {
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

    return (
      <Checkboxes
        key={f.id}
        listId={f.id}
        label={f.label}
        filters={filters}
        options={options}
        onChange={onChange}
      />
    )
  })
}

export default withHeaders(FormFilter)
