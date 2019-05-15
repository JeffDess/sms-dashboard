import React from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from '../common/table/sortedTable'
import { generateHeaders } from '../../utils/tables'
import db from '../../db.json'

function MessagesLog () {
  const headers = generateHeaders(db.messages)
  const rows = db.messages

  return (
    <>
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
    </>
  )
}

export default MessagesLog
