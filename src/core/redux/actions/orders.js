import {
  REGISTER_ORDER_SUCCESS,
  FETCH_ORDERS_SUCCESS,
  UPDATE_ORDER_SUCCESS
} from '../actionTypes/orders'
import fetchApi from 'core/api'
import { setLoader, resetLoader } from './main'

const registerOrderSuccess = (orderItem) => ({
  type: REGISTER_ORDER_SUCCESS,
  payload: { orderItem }
})

const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: { orders }
})

const updateOrderSuccess = (orderItem) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: { orderItem }
})

export const registerOrder = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('POST', '/order', payload)

    dispatch(registerOrderSuccess(response.data))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const updateOrder = (orderId, payload) => async dispatch => {
  dispatch(setLoader())
  try {
    console.log('ARE U EVEN FKN HERE')
    const response = await fetchApi('PUT', `/order/${orderId}`, payload)

    dispatch(updateOrderSuccess(response.data))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const fetchOrders = () => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('GET', `/orders`)

    dispatch(fetchOrdersSuccess(response.data))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

