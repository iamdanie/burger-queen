import React from 'react'
import PropTypes from 'prop-types'
import {TableCell, TableHead, TableRow} from '@material-ui/core'

const TableHeader = ({columns}) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((row, index) => (
          <TableCell
            key={row.id}
            align={'center'}
            padding={index === 0 ? 'none' : 'default'}>
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TableHeader
