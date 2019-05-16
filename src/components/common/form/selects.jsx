import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}))

function Selects ({ listId, label, options, filters, onSelect }) {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component='legend'>{label}</FormLabel>
      <Select
        value={
          (filters[listId] &&
            Object.entries(filters[listId])
              .filter(f => f[1] === true)
              .map(r => r[0])) ||
          ''
        }
        onChange={e => onSelect(listId, e.target.value)}
        input={<Input name={label} id={listId} />}
        displayEmpty
        name={label}
        className={classes.selectEmpty}
      >
        <MenuItem value=''>
          <em>All</em>
        </MenuItem>
        {options.map(o => (
          <MenuItem value={o} key={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Selects
