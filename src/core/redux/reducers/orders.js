import {
  FETCH_ORDERS_SUCCESS,
  REGISTER_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS
} from '../actionTypes/orders'

export const initialState = {
  orders: [],
  totalOrders: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...[action.payload.orderItem], ...state.orders]
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        totalOrders: action.payload.orders.length,
      }
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders.filter(
          orderItem => orderItem.id !== action.payload.orderItem
        ), ...[action.payload.orderItem]]
      }
    default:
      return state
  }
}
