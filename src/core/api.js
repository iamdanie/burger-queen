import { store } from 'core/redux/store'
import { logoutCurrentUser } from './redux/actions/users'

const API_URL = 'http://localhost:3001/api/v1'
const INVALID_TOKEN = 'INVALID_TOKEN'
const STATUS_UNAUTHORIZED = 401

const fetchApi = async (method, url, payload) => {
  const token = store.getState().user.userToken

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  if (payload) {
    requestOptions['body'] = JSON.stringify(payload)
  }

  try {
    const response = await fetch(`${API_URL}${url}`, requestOptions)
    let data = null
    data = await response.json()

    if (
      response.status === STATUS_UNAUTHORIZED &&
      data.errorCode === INVALID_TOKEN
    ) {
      await store.dispatch(logoutCurrentUser())
      return Promise.reject({
        status: response.status,
        error: 'You session has expired, please log in again'
      })
    }

    if (response.ok) {
      return Promise.resolve({ data, status: response.status })
    }

    return Promise.reject({ status: response.status, ...data })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default fetchApi
