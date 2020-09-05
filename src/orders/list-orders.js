import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button, makeStyles, Typography} from '@material-ui/core'
import {DataTable, ScreenHeader} from 'core/components'
import {useDispatch, useSelector} from 'react-redux'
import {fetchOrders} from 'core/redux/actions/orders'
import {useSnackbar} from 'core/contexts/snackbar-context'
import {Edit, Add} from '@material-ui/icons'
import {toFormattedDate} from './utils'

const useStyles = makeStyles(({palette, spacing}) => ({
  registerButton: {
    color: palette.common.white
  },
  screenHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textWarning: {
    color: palette.warning.main
  },
  textSuccess: {
    color: palette.success.main
  },
  textSecondary: {
    color: palette.secondary.main
  }
}))

const statuses = {
  PREPARING: {
    text: 'Preparando',
    className: 'textWarning'
  },
  READY: {
    text: 'Listo',
    className: 'textSuccess'
  },
  CLOSED: {
    text: 'Cerrado',
    className: 'textSecondary'
  }
}

const ListOrders = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const snackbar = useSnackbar()
  const history = useHistory()
  const {orders, loading, totalOrders} = useSelector(state => state.orders)

  React.useEffect(() => {
    const fetchOrderlist = async () => {
      try {
        await dispatch(fetchOrders())
      } catch (err) {
        snackbar(
          `Error: ${err.error || 'Something went wrong trying to fetch orders'}`
        )
      }
    }
    fetchOrderlist()
  }, [dispatch])

  const columns = [
    {
      id: 'table',
      label: 'Mesa'
    },
    {
      id: 'customer',
      label: 'Cliente'
    },
    {
      id: 'waiter',
      label: 'Mesero'
    },
    {
      id: 'createdAt',
      label: 'Registrado',
      component: {
        type: 'custom',
        jsx: row => (
          <Typography variant={'subtitle2'}>{`${toFormattedDate(
            row.createdAt
          )}`}</Typography>
        )
      }
    },
    {
      id: 'status',
      label: 'Estatus',
      component: {
        type: 'custom',
        jsx: row => (
          <Typography
            variant={'subtitle2'}
            className={classes[statuses[row.status].className]}>
            {statuses[row.status].text}
          </Typography>
        )
      }
    },
    {
      id: 'amount',
      label: 'Monto',
      component: {
        type: 'custom',
        jsx: row => (
          <Typography variant={'subtitle2'}>{`$${row.amount}`}</Typography>
        )
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      component: {
        type: 'actions',
        actions: [
          {
            onClick: orderItem => history.push(`/orders/edit/${orderItem.id}`),
            icon: () => <Edit />,
            label: 'Editar'
          }
        ]
      }
    }
  ]

  return (
    <>
      <div className={classes.screenHeaderContainer}>
        <ScreenHeader text="Pedidos" />
        <Button
          variant="contained"
          color="secondary"
          aria-label="Registrar Orden"
          className={classes.registerButton}
          size="small"
          component={Link}
          to="/orders/register">
          <Add /> Nuevo Pedido
        </Button>
      </div>
      <div className={classes.listDetailContainer}>
        <div className={classes.flex1}>
          {orders && (
            <DataTable
              rowId="id"
              showLoadingIndicator={loading}
              columns={columns}
              data={orders}
              itemCount={totalOrders}
              onChangePage={() => null}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ListOrders
