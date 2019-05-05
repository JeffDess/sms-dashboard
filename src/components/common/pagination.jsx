import React from 'react'
import PropTypes from 'prop-types'

function Pagination ({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize)

  if (pagesCount === 1) return null

  const pages = []
  for (let i = 1; i < pagesCount + 1; i++) {
    pages.push(i)
  }

  return (
    <nav aria-label='pagination'>
      <ul className='pagination'>
        {pages.map(p => (
          <li
            className={'page-item' + (p === currentPage ? ' active' : '')}
            key={p}
          >
            <button onClick={() => onPageChange(p)} className={'page-link'}>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination
