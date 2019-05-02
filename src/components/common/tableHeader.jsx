import React, { Component } from 'react'

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props
    if (column.path !== sortColumn.path) return null
    if (sortColumn.order === 'asc') {
      return <i className='fa fa-sort-asc' />
    }
    return <i className='fa fa-sort-desc' />
  }

  render () {
    return (
      <thead className='thead-dark'>
        <tr>
          {this.props.headers.map(th => (
            <th
              className='clickable'
              key={th.label || th.path}
              scope='col'
              onClick={() => this.raiseSort(th.path)}
            >
              {th.label} {this.renderSortIcon(th)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
