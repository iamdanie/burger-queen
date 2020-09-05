import {
  SET_LOADING,
  RESET_LOADING
} from '../actionTypes/main'

export const setLoader = () => ({
  type: SET_LOADING
})

export const resetLoader = () => ({
  type: RESET_LOADING
})
