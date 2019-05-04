import React from 'react'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { stableSort, getSorting } from '../../utils/sort'

const SortedTableBody = ({ order, orderBy, rows, page, rowsPerPage }) => {
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <TableBody>
      {stableSort(rows, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          return (
            <TableRow hover key={Object.values(n)[0]}>
              {Object.values(n).map(r => (
                <TableCell key={r}>{r}</TableCell>
              ))}
            </TableRow>
          )
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

SortedTableBody.propTypes = {
  page: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default SortedTableBody
