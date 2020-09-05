import { combineReducers } from 'redux'

import {
  SET_LOADING,
  RESET_LOADING
} from '../actionTypes/main'

import orders from './orders'
import menu from './menu'
import user from './user'

export const initialState = {
  loading: false
}

export const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }
    case RESET_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
}

export const reducer = combineReducers(
  {
    main, user, orders, menu
  }
)
