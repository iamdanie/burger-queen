import React from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Typography,
  TextField,
  makeStyles,
  MenuItem,
  Menu,
  Chip,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import {ScreenHeader} from 'core/components'
import {useSnackbar} from 'core/contexts/snackbar-context'
import {useSelector, useDispatch} from 'react-redux'
import {registerOrder, updateOrder} from 'core/redux/actions/orders'
import ConfirmationModal from 'core/components/confirmation-modal'
import {
  MoreVert,
  Fastfood,
  FreeBreakfast,
  LocalDrink,
  RemoveCircle
} from '@material-ui/icons'
import {fetchMenu} from 'core/redux/actions/menu'
import fetchApi from 'core/api'
import styles from './styles'
import MenuSection from './menu-section'
import {toFormattedDate} from 'orders/utils'

const useStyles = makeStyles(styles)

const schema = Yup.object().shape({
  customer: Yup.string().required('Required'),
  table: Yup.number()
    .typeError('Agrega un número que corresponda a una mesa')
    .min(1)
    .max(1000000)
    .required('Required')
})

export default function RegisterOrder({match}) {
  const orderId = match?.params?.id
  const [anchorEl, setAnchorEl] = React.useState(null)
  const complementsOpen = Boolean(anchorEl)
  const [cancel, setCancel] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [menuTab, setMenuTab] = React.useState(1)
  const [currentMenu, setCurrentMenu] = React.useState([])
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [currentOrder, setCurrentOrder] = React.useState({
    orderMenuItems: [],
    amount: 0,
    status: 'PREPARING'
  })

  const history = useHistory()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.main)
  const {user} = useSelector(state => state.user)
  const {menuItems} = useSelector(state => state.menu)
  const classes = useStyles()
  const snackbar = useSnackbar()

  const initialValues = {
    customer: currentOrder.customer || '',
    table: currentOrder.table || ''
  }

  React.useEffect(() => {
    const updateAmount = () => {
      let amount = 0
      currentOrder.orderMenuItems.map(orderItem => {
        const menuItem = menuItems.find(
          menuItem => menuItem.id === orderItem.menuItemId
        )
        amount += menuItem.price

        orderItem.complements.map(complementid => {
          const complementItem = menuItems.find(
            menuItem => menuItem.id === complementid
          )
          amount += complementItem.price
        })
      })

      return amount
    }
    const newAmount = updateAmount()
    setTotalAmount(newAmount)
  }, [currentOrder])

  React.useEffect(() => {
    fetchMenuItems()
    if (orderId) {
      fetchOrderById()
    }
  }, [dispatch])

  const fetchMenuItems = async () => {
    try {
      await dispatch(fetchMenu())
      filterMenuByTab(null, 1)
    } catch (err) {
      snackbar(
        `Error: ${err.error || 'Something went wrong trying to fetch the menu'}`
      )
    }
  }

  const fetchOrderById = async () => {
    try {
      const response = await fetchApi('GET', `/order/${orderId}`)
      const editOrder = response.data

      setCurrentOrder(editOrder)
    } catch (err) {
      snackbar(
        `Error: ${err.error ||
          'Something went wrong trying to fetch the order to edit'}`
      )
    }
  }

  const handleOnConfirm = () => {
    setModalOpen(false)
    setCancel(true)
  }

  const handleOpenComplements = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseComplements = (menuItemIndex, complement) => () => {
    const updatedOrder = {...currentOrder}
    updatedOrder.orderMenuItems[menuItemIndex].complements.push(complement.id)
    setCurrentOrder(updatedOrder)
    setAnchorEl(null)
  }

  const createOrder = async payload => dispatch(registerOrder(payload))
  const updateCreatedOrder = async (orderId, payload) =>
    dispatch(updateOrder(orderId, payload))

  const handleOnSubmit = async values => {
    const payload = {
      ...values,
      ...currentOrder,
      amount: totalAmount,
      waiter: user.name
    }

    if (!currentOrder.orderMenuItems.length) {
      snackbar('Debes agregar elementos al pedido para poder guardarlo')
      return
    }

    try {
      orderId
        ? await updateCreatedOrder(orderId, payload)
        : await createOrder(payload)
      snackbar('La información de la orden se ha guardado con éxito')
      history.push('/orders')
    } catch (err) {
      snackbar(
        `Error: ${err.error ||
          'Hubo un error al guardar la información de la orden'}`
      )
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleModalOpen = () => setModalOpen(true)

  const filterMenuByTab = (event, newTab) => {
    setMenuTab(newTab)
    switch (newTab) {
      case 0: {
        setCurrentMenu(menuItems.filter(menu => menu.category === 'BREAKFAST'))
        break
      }
      case 1: {
        setCurrentMenu(menuItems.filter(menu => menu.category === 'MAIN_DISH'))
        break
      }
      case 2: {
        setCurrentMenu(menuItems.filter(menu => menu.category === 'BEVERAGE'))
        break
      }
      default: {
        break
      }
    }
  }

  const handleUpdateStatus = event => {
    const status = event.currentTarget.value
    const updatedOrder = {...currentOrder, status}
    setCurrentOrder(updatedOrder)
  }

  const handleAddToOrder = menuItem => () => {
    const updatedOrder = {...currentOrder}

    updatedOrder.orderMenuItems.push({menuItemId: menuItem.id, complements: []})
    setCurrentOrder(updatedOrder)
  }

  const removeAddedItem = addedItemIndex => () => {
    const updatedOrder = {...currentOrder}
    const newItems = updatedOrder.orderMenuItems.filter(
      (item, index) => index !== addedItemIndex
    )

    updatedOrder.orderMenuItems = newItems
    setCurrentOrder(updatedOrder)
  }

  const findComplements = menuItem =>
    menuItems.filter(item => item.category === menuItem.complementCategory)

  const removeComplement = (orderMenuItemIndex, complement) => () => {
    const updatedOrder = {...currentOrder}
    const menuComplement = menuItems.find(
      menuItem => menuItem.name === complement
    )
    const complements = updatedOrder.orderMenuItems[
      orderMenuItemIndex
    ].complements.filter(compl => compl !== menuComplement.id)

    updatedOrder.orderMenuItems[orderMenuItemIndex].complements = complements
    setCurrentOrder(updatedOrder)
  }

  return cancel ? (
    <Redirect to="/orders" />
  ) : (
    <Container maxWidth="xl">
      <ConfirmationModal
        isOpen={modalOpen}
        description={'Si cancelas la orden, se perderán todos los datos'}
        title={'Cancelar Orden'}
        onConfirm={handleOnConfirm}
        onCancel={handleCloseModal}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={schema}>
        {({
          dirty,
          errors,
          handleBlur,
          handleChange,
          isValid,
          submitForm,
          touched,
          values
        }) => (
          <>
            <div className={classes.screenHeaderContainer}>
              <ScreenHeader previous={{route: '/orders', text: 'Pedidos'}} />
              <div className={classes.actionsContainer}>
                <Button
                  className={classes.cancelButton}
                  variant="text"
                  color="primary"
                  aria-label="Cancelar"
                  disabled={loading}
                  onClick={handleModalOpen}>
                  Cancelar
                </Button>
                <div className={classes.createButtonWrapper}>
                  <Button
                    className={classes.createButton}
                    variant="contained"
                    color="secondary"
                    aria-label={orderId ? 'Editar' : 'Crear'}
                    disabled={!dirty || !isValid || loading}
                    onClick={submitForm}>
                    {loading
                      ? orderId
                        ? 'Editando'
                        : 'Creando'
                      : orderId
                      ? 'Editar'
                      : 'Crear'}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.createButtonProgress}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={classes.viewDetail}>
              <Paper className={classes.paper}>
                <div className={classes.orderHeader}>
                  <div>
                    <Typography component="h1" variant="h5">
                      {orderId ? 'Pedido creado el' : 'Nuevo Pedido'}
                    </Typography>
                    {currentOrder.createdAt && (
                      <Typography variant="subtitle2">
                        {toFormattedDate(currentOrder.createdAt)}
                      </Typography>
                    )}
                  </div>
                  <div>
                    {orderId && (
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Estatus
                        </InputLabel>
                        <Select
                          native
                          value={currentOrder.status}
                          onChange={handleUpdateStatus}
                          label="Estatus"
                          inputProps={{
                            name: 'status',
                            id: 'outlined-age-native-simple'
                          }}>
                          <option value={'READY'}>Listo</option>
                          <option value={'CLOSED'}>Cerrado</option>
                          <option value={'PREPARING'}>Preparando</option>
                        </Select>
                      </FormControl>
                    )}
                  </div>
                </div>
                <TextField
                  id="table"
                  name="table"
                  label="Mesa"
                  variant="outlined"
                  margin="normal"
                  value={values.table}
                  onChange={handleChange}
                  inputProps={{onBlur: handleBlur}}
                  error={errors.table && touched.table}
                  helperText={touched.table && errors.table}
                  required
                />
                <TextField
                  id="customer"
                  name="customer"
                  label="Nombre del cliente"
                  variant="outlined"
                  margin="normal"
                  value={values.customer}
                  onChange={handleChange}
                  inputProps={{
                    onBlur: handleBlur
                  }}
                  error={errors.customer && touched.customer}
                  helperText={touched.customer && errors.customer}
                  required
                  fullWidth
                />
                <Typography variant="h6">{'Detalle'}</Typography>
                <div className={classes.orderItems}>
                  {currentOrder.orderMenuItems.map(
                    (item, orderMenuItemIndex) => {
                      const menuItem = menuItems.find(
                        menu => menu.id === item.menuItemId
                      )
                      let complements = {}
                      item.complements.map(complement => {
                        const menuInfo = menuItems.find(
                          menu => menu.id === complement
                        )
                        complements[menuInfo.name] =
                          (complements[menuInfo.name] || 0) + 1
                      })

                      return (
                        <Paper
                          key={orderMenuItemIndex}
                          elevation={1}
                          className={classes.orderItem}>
                          <div>
                            <Typography variant="subtitle1">
                              {menuItem.name}
                            </Typography>
                            <div>
                              {Object.keys(complements).map(complement => (
                                <Chip
                                  key={complement}
                                  size={'small'}
                                  label={`${complement} (${complements[complement]})`}
                                  onDelete={removeComplement(
                                    orderMenuItemIndex,
                                    complement
                                  )}
                                  color={'secondary'}
                                  variant={'outlined'}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <Typography component={'h2'} variant="subtitle1">
                              {`$${menuItem.price}`}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              size="small"
                              aria-label="Remover"
                              color={'secondary'}
                              onClick={removeAddedItem(orderMenuItemIndex)}>
                              <RemoveCircle />
                            </IconButton>
                            {menuItem.complementCategory !== null && (
                              <IconButton
                                size="small"
                                aria-label="Complementos"
                                aria-controls={`complements-menu-${orderMenuItemIndex}`}
                                aria-haspopup="true"
                                color={'secondary'}
                                onClick={handleOpenComplements}>
                                <MoreVert />
                              </IconButton>
                            )}
                            {menuItem.complementCategory !== null && (
                              <Menu
                                id={`complements-menu-${orderMenuItemIndex}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={complementsOpen}
                                PaperProps={{
                                  style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch'
                                  }
                                }}>
                                {findComplements(menuItem).map(
                                  complementMenu => (
                                    <MenuItem
                                      key={complementMenu.name}
                                      onClick={handleCloseComplements(
                                        orderMenuItemIndex,
                                        complementMenu
                                      )}>
                                      {complementMenu.name}
                                    </MenuItem>
                                  )
                                )}
                              </Menu>
                            )}
                          </div>
                        </Paper>
                      )
                    }
                  )}
                </div>
                <div className={classes.amountSection}>
                  <Typography component="h1" variant="h6">
                    {'Total'} {`$${totalAmount}`}
                  </Typography>
                </div>
              </Paper>
              {menuItems && (
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    {'Menu'}
                  </Typography>
                  <Paper>
                    <Tabs
                      centered
                      value={menuTab}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={filterMenuByTab}
                      aria-label="disabled tabs example">
                      <Tab icon={<FreeBreakfast />} label="Desayuno" />
                      <Tab icon={<Fastfood />} label="Comida/Cena" />
                      <Tab icon={<LocalDrink />} label="Sides y Bebidas" />
                    </Tabs>
                  </Paper>
                  <div className={classes.menuItems}>
                    <MenuSection
                      currentMenu={currentMenu}
                      classes={classes}
                      handleAddToOrder={handleAddToOrder}
                      menuTab={menuTab}
                    />
                  </div>
                </Paper>
              )}
            </div>
          </>
        )}
      </Formik>
    </Container>
  )
}
