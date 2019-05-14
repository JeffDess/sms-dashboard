import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { plurialize } from '../../utils/strings'
import { generateHeaders } from '../../utils/tables'

function TableStats ({ rows }) {
  const headers = generateHeaders(rows)
  return (
    <Grid container spacing={2}>
      {headers.map(r => (
        <Grid
          item
          key={r.id}
          xs={12}
          sm={Math.floor(12 / headers.length) * 2}
          md={Math.floor(12 / headers.length)}
        >
          <Card bgcolor='primary.main'>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {plurialize(r.label)}
              </Typography>
              <Typography variant='h3'>
                {
                  [...new Set(rows.filter(n => !!n[r.id]).map(p => p[r.id]))]
                    .length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default TableStats
