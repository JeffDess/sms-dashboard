import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class NotFound extends Component {
  state = {}
  render () {
    return (
      <Typography component='h1' variant='h3'>
        Not Found (404)
      </Typography>
    )
  }
}

export default NotFound
