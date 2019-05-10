import React from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from '../common/table/sortedTable'
import SubscriptionsStats from '../widgets/subscriptionsStats'
import db from '../../db.json'

function Subscriptions () {
  const [rows] = React.useState(db.subscriptions)

  return (
    <React.Fragment>
      <Typography component='h1' variant='h3' gutterBottom>
        Subscriptions
      </Typography>
      <SubscriptionsStats rows={rows} />
      <SortedTable
        margin={8}
        caption='List of subscriptions'
        order='asc'
        orderBy='phoneNumber'
        rows={rows}
        rowsPerPage={5}
      />
    </React.Fragment>
  )
}

export default Subscriptions
