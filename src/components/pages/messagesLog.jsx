import React from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from '../common/table/sortedTable'
import { camelToNormalCase } from '../../utils/strings'
import db from '../../db.json'

function generateHeaders (rows) {
  return [
    ...new Set(
      rows.map(s =>
        Object.keys(s).map(k => ({
          id: k,
          label: camelToNormalCase(k)
        }))
      )
    )
  ].reduce((acc, x) => acc.indexOf(x) && x)
}

function MessagesLog () {
  const [headers] = React.useState(generateHeaders(db.messages))
  const [rows] = React.useState(db.messages)

  return (
    <React.Fragment>
      <Typography component='h1' variant='h3'>
        Messages Log
      </Typography>

      <SortedTable
        margin={8}
        caption='Sent messages'
        headers={headers}
        order='asc'
        orderBy={headers[0].id}
        rows={rows}
        rowsPerPage={5}
      />
    </React.Fragment>
  )
}

export default MessagesLog
