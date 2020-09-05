import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  makeStyles,
  Tooltip
} from '@material-ui/core'
import styles from './styles'
import TableHeader from './header'
import TablePagination from './pagination'
import Loader from '../loader'

const ACTIONS_COMPONENT = 'actions'

const useStyles = makeStyles(styles)

const DataTable = ({
  columns,
  data,
  rowId,
  showLoadingIndicator = false,
  itemCount
}) => {
  const DEFAULT_ROWS_PER_PAGE = 10
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [tableData, setTableData] = useState([])
  const classes = useStyles()

  useEffect(() => {
    setTableData(data)
  }, [data])

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelected(data.map(n => n[rowId]))
      return
    }
    setSelected([])
  }

  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
  }

  const getComponent = (column, row) => {
    switch (column.component.type) {
      case ACTIONS_COMPONENT:
        return (
          <div>
            {column.component.actions.map((action, index) => (
              <Tooltip key={index} title={action.label}>
                <IconButton
                  className={classes.actionColumnButton}
                  onClick={() => action.onClick(row)}
                  disabled={row[action.disableIf]}>
                  <action.icon />
                </IconButton>
              </Tooltip>
            ))}
          </div>
        )
      case 'custom':
        return (
          <div>
            {column.component.jsx(row)}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        {showLoadingIndicator ? (
          <Loader />
        ) : (
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              stickyHeader>
              <TableHeader
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.length}
                columns={columns}
              />

              <TableBody>
                {tableData.map((row, index) => {
                  return (
                    <TableRow
                      className={classes.row}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}>
                      {columns.map((column, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          padding={index === 0 ? 'none' : 'default'}>
                          {column.component
                            ? getComponent(column, row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
      </div>
      {!showLoadingIndicator ? (
        <TablePagination
          count={itemCount}
          rowsPerPage={DEFAULT_ROWS_PER_PAGE}
          currentPage={page}
          onChangePage={handleChangePage}
        />
      ) : null}
    </Paper>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      component: PropTypes.shape({
        type: PropTypes.oneOf(['actions', 'custom']),
        actions: PropTypes.arrayOf(
          PropTypes.shape({
            onClick: PropTypes.func.isRequired,
            icon: PropTypes.func.isRequired,
            label: PropTypes.string.isRequired
          })
        )
      })
    })
  ),
  data: PropTypes.array.isRequired,
  header: PropTypes.string,
  serverPagination: PropTypes.object,
  showLoadingIndicator: PropTypes.bool,
  itemCount: PropTypes.number
}

export default DataTable
