import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import { makeStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
}))

function TableToolbar ({ caption }) {
  const classes = useStyles()
  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant='h6' id='tableTitle'>
          {caption}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title='Filter list'>
          <IconButton aria-label='Filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  caption: PropTypes.string.isRequired
}

export default TableToolbar
