import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ headers, movies, sortColumn, onSort }) => {
  return (
    <table className='table table-striped'>
      <TableHeader headers={headers} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={headers} />
    </table>
  )
}

export default Table
