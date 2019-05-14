import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}))

function Checkboxes ({ listId, label, options, filters, onCheck }) {
  const classes = useStyles()
  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <FormLabel component='legend'>{label}</FormLabel>
      {options.map(o => (
        <FormControlLabel
          key={o}
          control={
            <Checkbox
              checked={(filters[listId] && !!filters[listId][o]) || false}
              onChange={() => onCheck(listId, o)}
              value={o}
            />
          }
          label={o}
        />
      ))}
    </FormControl>
  )
}

export default Checkboxes
