import React from 'react'
import Typography from '@material-ui/core/Typography'
import SortedTable from './common/sortedTable'
import SubscriptionsStats from './subscriptionsStats'
import { camelToNormalCase } from '../utils/strings'
import db from '../db.json'

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

const Subscriptions = () => {
  const [headers] = React.useState(generateHeaders(db.subscriptions))
  const [rows] = React.useState(db.subscriptions)

  return (
    <React.Fragment>
      <Typography component='h1' variant='h3' gutterBottom>
        Subscriptions
      </Typography>
      <SubscriptionsStats headers={headers} rows={rows} />
      <SortedTable
        margin={8}
        caption='List of subscriptions'
        headers={headers}
        order='asc'
        orderBy={headers[0].id}
        rows={rows}
        rowsPerPage={5}
      />
    </React.Fragment>
  )
}

export default Subscriptions
