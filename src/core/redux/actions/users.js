import { store } from 'core/redux/store'
import {
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_PASSWORD_SUCCESS,
} from '../actionTypes/users'
import fetchApi from 'core/api'
import { setLoader, resetLoader } from './main'

const logInSuccess = data => ({
  type: LOG_IN_SUCCESS,
  payload: data
})

const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS
})

const updatePasswordSuccess = () => ({
  type: UPDATE_USER_PASSWORD_SUCCESS
})

const logInError = error => ({
  type: LOG_IN_ERROR,
  payload: { error }
})

const logOutUser = () => ({
  type: LOG_OUT_SUCCESS
})

export const authenticateUser = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('POST', '/user/authenticate', payload)
    dispatch(logInSuccess(response.data))
  } catch (error) {
    dispatch(logInError(error))
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const logoutCurrentUser = () => async dispatch => {
  dispatch(logOutUser())
}

export const registerUser = payload => async dispatch => {
  dispatch(setLoader())
  try {
    await fetchApi('POST', '/user', payload)
    dispatch(registerUserSuccess())
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const updateUserPassword = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const userId = store.getState().user.id
    await fetchApi('PUT', `/user/password/${userId}`, payload)

    dispatch(updatePasswordSuccess())
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}
