import React, { Component } from 'react'

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item)
    const path = column.path.split('.')
    return path.reduce((x, y) => x[y], item)
  }
  render () {
    const { data, columns } = this.props
    return (
      <tbody>
        {data.map(i => (
          <tr key={i._id}>
            {columns.map(c => (
              <td key={c.path}>{this.renderCell(i, c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TableBody
