import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles } from '@material-ui/core/styles'
import TableToolbar from './tableToolbar'
import SortedTableHeader from './sortedTableHeader'
import SortedTableBody from './sortedTableBody'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}))

const SortedTable = ({
  caption,
  headers,
  rows,
  rowsPerPage,
  order,
  orderBy
}) => {
  const [sOrder, setOrder] = React.useState(order)
  const [sOrderBy, setOrderBy] = React.useState(orderBy)
  const [sPage, setPage] = React.useState(0)
  const [sRowsPerPage, setRowsPerPage] = React.useState(rowsPerPage)

  function handleRequestSort (event, property) {
    const isDesc = sOrderBy === property && sOrder === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleChangePage (event, page) {
    setPage(page)
  }

  function handleChangeRowsPerPage (event) {
    setRowsPerPage(event.target.value)
  }

  const createSortHandler = property => event => {
    handleRequestSort(event, property)
  }

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <TableToolbar caption={caption} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby='tableTitle'>
          <SortedTableHeader
            headers={headers}
            order={sOrder}
            orderBy={sOrderBy}
            rowCount={rows.length}
            onRequestSort={handleRequestSort}
            onCreateSort={createSortHandler}
          />
          <SortedTableBody
            order={sOrder}
            orderBy={sOrderBy}
            rows={rows}
            page={sPage}
            rowsPerPage={sRowsPerPage}
          />
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={sRowsPerPage}
        page={sPage}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

SortedTable.propTypes = {
  caption: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default SortedTable
