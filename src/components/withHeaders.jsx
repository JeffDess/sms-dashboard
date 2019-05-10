import React from 'react'
import { camelToNormalCase } from '../utils/strings'

function withHeaders (Component, rows) {
  const headers = [
    ...new Set(
      rows.map(s =>
        Object.keys(s).map(k => ({
          id: k,
          label: camelToNormalCase(k)
        }))
      )
    )
  ].reduce((acc, x) => acc.indexOf(x) && x)

  return function (props) {
    return <Component headers={headers} {...props} />
  }
}

export default withHeaders
