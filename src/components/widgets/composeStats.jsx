import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

function ComposeStats ({ rows }) {
  const statsList = Object.entries(rows)
  return (
    <Grid container spacing={2}>
      {statsList.map(s => (
        <Grid
          item
          key={s[0]}
          xs={12}
          sm={Math.floor(12 / statsList.length) * 2}
          md={Math.floor(12 / statsList.length)}
        >
          <Card bgcolor='primary.main'>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {s[1].label}
              </Typography>
              <Typography variant='h3'>{s[1].value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ComposeStats
