import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from '../common/table/sortedTable'
import { generateHeaders } from '../../utils/tables'
import { getMessages } from '../../services/messagesService'

function MessagesLog () {
  const [headers, setHeaders] = useState([{}])
  const [rows, setRows] = useState([{}])

  useEffect(() => {
    async function fetchMessages () {
      const messages = await getMessages()
      setHeaders(generateHeaders(messages.data))
      setRows(messages.data)
    }

    fetchMessages()
  }, [])

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
        orderBy='timestamp'
        rows={rows}
        rowsPerPage={5}
      />
    </>
  )
}

export default MessagesLog
