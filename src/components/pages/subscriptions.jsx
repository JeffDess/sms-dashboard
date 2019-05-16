import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from '../common/table/sortedTable'
import TableStats from '../widgets/tableStats'
import { getSubscriptions } from '../../services/subscriptionsService'
import { fetchData } from '../../utils/fetch'

function Subscriptions () {
  const [rows, setRows] = useState([{}])

  useEffect(() => {
    fetchData(getSubscriptions, setRows)
  }, [])

  return (
    <>
      <Typography component='h1' variant='h3' gutterBottom>
        Subscriptions
      </Typography>
      <TableStats rows={rows} />
      <SortedTable
        margin={8}
        caption='List of subscriptions'
        order='asc'
        orderBy='phoneNumber'
        rows={rows}
        rowsPerPage={5}
      />
    </>
  )
}

export default Subscriptions
